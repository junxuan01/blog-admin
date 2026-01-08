import type {
  APIAdminConfigsDictionary,
  APIAdminConfigsGetDictionaryReplyData,
} from '@api/config';
import { getConfig } from '@api/config';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

/**
 * Dictionary option type
 */
export interface DictionaryOption {
  label: string;
  value: string;
  [key: string]: any;
}

/**
 * Dictionary category type - extracted from API response
 */
export type DictionaryCategory = keyof APIAdminConfigsGetDictionaryReplyData;

/**
 * Dictionary group - all categories mapped to options
 */
export type DictionaryGroup = Record<string, DictionaryOption[]>;

/**
 * useDictionary hook - manages enterprise configuration as dictionary data
 *
 * @example
 * ```tsx
 * const { loading, categoryGroup } = useDictionary();
 * const carTypes = categoryGroup?.car_types || [];
 * ```
 */
export const useDictionary = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dictionary'],
    queryFn: getConfig,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // 请求失败不重试，避免无限重试
    refetchOnWindowFocus: false, // 切换窗口不重新请求
    enabled: Boolean(process.env.NEXT_PUBLIC_BASE_API_URL), // 只有配置了 API URL 才请求
  });

  /**
   * Transform API response to DictionaryGroup format
   */
  const categoryGroup = useMemo<DictionaryGroup | undefined>(() => {
    if (!data) return undefined;

    const result: DictionaryGroup = {};

    // Transform each category to DictionaryOption[]
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        result[key] = value.map((item: APIAdminConfigsDictionary) => ({
          label: item.label ?? '',
          value: item.value ?? '',
          ...item,
        }));
      }
    });

    return result;
  }, [data]);

  return {
    loading: isLoading,
    data,
    categoryGroup,
  };
};
