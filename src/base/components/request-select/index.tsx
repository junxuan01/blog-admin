import { useQuery } from '@tanstack/react-query';
import type { GetProps } from 'antd';
import { Select, Spin } from 'antd';
import { debounce, unionBy } from 'lodash';
import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

type SelectProps = GetProps<typeof Select<string>>;

/**
 * Data item returned by request function
 */
export interface RequestSelectDataItem<T = any> {
  label: string;
  value: string;
  origin?: T;
  hidden?: boolean;
  disabled?: boolean;
}

/**
 * Request function params
 */
export interface RequestSelectParams {
  searchValue?: string;
  current: number;
  pageSize: number;
  exist_id?: string;
  [key: string]: any;
}

/**
 * Request function response
 */
export interface RequestSelectResponse<T = any> {
  total: number;
  data: RequestSelectDataItem<T>[];
  success: boolean;
}

/**
 * Request function type
 */
export type RequestSelectRequestFn<T = any> = (
  params: RequestSelectParams
) => Promise<RequestSelectResponse<T>>;

/**
 * RequestSelect component props
 */
export interface RequestSelectProps<T = any>
  extends Omit<SelectProps, 'options'> {
  /**
   * Unique cache key for session storage
   */
  cacheKey: string;

  /**
   * Request function to fetch data
   */
  request: RequestSelectRequestFn<T>;

  /**
   * Additional params to pass to request function
   */
  params?: Record<string, any>;

  /**
   * Page size for pagination
   * @default 1000
   */
  pageSize?: number;

  /**
   * Enable remote search (debounced)
   * @default false
   */
  remoteSearch?: boolean;

  /**
   * Render mode - edit or read-only
   * @default 'edit'
   */
  renderMode?: 'edit' | 'read';

  /**
   * Filter to disable specific options
   */
  disabledOptionItem?: (
    option: RequestSelectDataItem<T>,
    disabled?: boolean
  ) => boolean;

  /**
   * Filter to hide specific options
   */
  hiddenOptionItem?: (
    option: RequestSelectDataItem<T>,
    hidden?: boolean
  ) => boolean;

  /**
   * Custom label render function
   */
  customLabelRender?: (
    props: { label: string; value: string },
    option: RequestSelectDataItem<T>
  ) => React.ReactNode;
}

/**
 * RequestSelect component - async select with caching, pagination and search
 *
 * @example
 * ```tsx
 * <RequestSelect
 *   cacheKey="userSelect"
 *   request={async ({ searchValue, current, pageSize }) => {
 *     const res = await api.getUsers({ search: searchValue, page: current, size: pageSize });
 *     return {
 *       data: res.list.map(u => ({ label: u.name, value: u.id, origin: u })),
 *       total: res.total,
 *       success: true
 *     };
 *   }}
 *   remoteSearch
 * />
 * ```
 */
export function RequestSelect<T = any>(props: RequestSelectProps<T>) {
  const {
    renderMode = 'edit',
    request,
    pageSize = 1000,
    mode,
    value,
    params,
    disabledOptionItem,
    hiddenOptionItem,
    remoteSearch = false,
    cacheKey,
    onChange,
    customLabelRender,
    ...reset
  } = props;

  /**
   * Transform data items with disabled/hidden filters
   */
  const transformDataToOptions = useCallback(
    (data?: RequestSelectDataItem<T>[]) => {
      const res = data || [];
      return res.map(item => ({
        ...item,
        disabled: disabledOptionItem?.(item, item.disabled) ?? item.disabled,
        hidden: hiddenOptionItem?.(item, item.hidden) ?? item.hidden,
      }));
    },
    [disabledOptionItem, hiddenOptionItem]
  );

  /**
   * Session storage cache for options
   */
  const storageKey = useMemo(
    () => `request-select:${cacheKey}:${JSON.stringify(params ?? {})}`,
    [cacheKey, params]
  );

  const [cacheOptions, _setCacheOptions] = useState<RequestSelectDataItem<T>[]>(
    () => {
      try {
        const storageKeyInit = `request-select:${cacheKey}:${JSON.stringify(params ?? {})}`;
        const cached = sessionStorage.getItem(storageKeyInit);
        return cached ? JSON.parse(cached) : [];
      } catch {
        return [];
      }
    }
  );

  // Wrapper to sync sessionStorage when setting cache
  const setCacheOptions = useCallback(
    (options: RequestSelectDataItem<T>[]) => {
      _setCacheOptions(options);
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(options));
      } catch {
        // Ignore storage errors
      }
    },
    [storageKey]
  );

  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<
    RequestSelectDataItem<T>[]
  >([]);

  // Debounced search value
  const debouncedSetSearchValue = useRef(
    debounce((val: string) => setSearchValue(val), 500)
  ).current;

  const multiple = useMemo(() => mode === 'multiple', [mode]);

  /**
   * Generate exist_id param for fetching current selected values
   */
  const exist_id = useMemo(() => {
    return (multiple && Array.isArray(value) ? value.join(',') : value) ?? '';
  }, [multiple, value]);

  /**
   * Initial data request with cache
   */
  const {
    isLoading: initLoading,
    data: initData,
    refetch: initRun,
  } = useQuery({
    queryKey: ['request-select', cacheKey, params],
    queryFn: () =>
      request({
        exist_id,
        pageSize,
        current: 1,
        ...params,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: false, // Manual trigger
  });

  // 使用 useEffect 来更新缓存，避免在 select 回调中更新状态
  const initDataProcessed = useRef(false);
  const initDataRef = useRef(initData);
  
  if (initDataRef.current !== initData) {
    initDataRef.current = initData;
    initDataProcessed.current = false;
  }

  if (initData?.data && !initDataProcessed.current) {
    initDataProcessed.current = true;
    // 使用 queueMicrotask 延迟更新，避免在渲染期间更新状态
    queueMicrotask(() => {
      setCacheOptions(transformDataToOptions(initData.data));
    });
  }

  /**
   * Search request
   */
  const { isLoading: searchLoading, data: searchData } = useQuery({
    queryKey: [
      'request-select-search',
      cacheKey,
      params,
      searchValue,
    ],
    queryFn: () =>
      request({
        exist_id,
        searchValue,
        pageSize,
        current: 1,
        ...params,
      }),
    enabled: searching && searchValue !== '',
    staleTime: 1000 * 60, // 1 minute
  });

  const initOptions = useMemo(() => {
    return transformDataToOptions(initData?.data);
  }, [initData, transformDataToOptions]);

  const searchOptions = useMemo(() => {
    return transformDataToOptions(searchData?.data);
  }, [searchData, transformDataToOptions]);

  /**
   * Combine selected, init, and cached options (deduplicated by value)
   */
  const combineOptions = useMemo(() => {
    return unionBy(
      [...selectedOptions, ...initOptions, ...cacheOptions],
      'value'
    );
  }, [initOptions, selectedOptions, cacheOptions]);

  /**
   * Final options - use search results when searching, otherwise combined options
   */
  const options = useMemo(() => {
    if (searching) {
      return searchOptions;
    }
    return combineOptions;
  }, [searching, searchOptions, combineOptions]);

  const loading = useMemo(() => {
    return initLoading || searchLoading;
  }, [initLoading, searchLoading]);

  /**
   * Read-only mode - display label only
   */
  if (renderMode === 'read') {
    const label = options?.find(item => item.value === value)?.label;
    return <>{label ?? value}</>;
  }

  return (
    <Select
      loading={loading}
      options={options}
      allowClear
      showSearch={{
        searchValue: remoteSearch ? searchValue : undefined,
        filterOption: !remoteSearch,
        onSearch(value) {
          if (remoteSearch) {
            debouncedSetSearchValue(value);
            setSearching(true);
          }
        },
      }}
      fieldNames={{ label: 'label', value: 'value' }}
      placeholder='Please Select'
      value={value}
      mode={mode}
      labelRender={
        customLabelRender
          ? props => {
              return customLabelRender(
                props as any,
                options?.find(item => item.value === props.value) as any
              );
            }
          : undefined
      }
      onChange={(val: any, ops: any) => {
        if (multiple) {
          setSelectedOptions(ops);
        } else {
          setSelectedOptions(ops ? [ops] : []);
        }
        onChange?.(val, ops);
      }}
      onOpenChange={bl => {
        if (bl) {
          // Only refetch if cache is empty or stale
          // This prevents unnecessary API calls on every dropdown open
          if (!initData?.data?.length || initData?.data?.length === 0) {
            initRun();
          }
        } else {
          setSearching(false);
          if (remoteSearch) {
            setSearchValue('');
          }
        }
      }}
      popupRender={menu => <Spin spinning={searchLoading}>{menu}</Spin>}
      {...reset}
    />
  );
}
