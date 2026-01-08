import {
  type ActionType,
  type ParamsType,
  type ProColumns,
  type ProFormInstance,
  ProTable,
  type ProTableProps,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { merge } from 'lodash';
import type React from 'react';
import { useImperativeHandle, useMemo, useRef } from 'react';
import {
  type CusProComponentsType,
  createPlaceholder,
  transformMap,
  valueTypeMap,
} from '../pro-components';

export type BaseTableActionType = ActionType;
export type BaseTableSearchForm = ProFormInstance;
export type BaseTableProps<T extends Record<string, any> = any> = Parameters<
  typeof BaseTable<T>
>[0];

/**
 * BaseTable 组件
 * 基于 ProTable 封装，统一表格功能
 *
 * 核心特性：
 * 1. 分离表格列和搜索列
 * 2. 双 Ref 模式（actionRef + formRef）
 * 3. 自动生成 placeholder
 * 4. 自动数据转换（dateRange 等）
 * 5. 表单自动提交（onValuesChange + debounce）
 */
const BaseTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = CusProComponentsType,
>(
  props: ProTableProps<DataType, Params, ValueType> & {
    searchColumns?: ProTableProps<DataType, Params, ValueType>['columns'];
    actionRef?: React.Ref<BaseTableActionType | undefined>;
    formRef?: React.Ref<BaseTableSearchForm | undefined>;
    beforeSearchSubmit?: (data: Record<string, any>) => Record<string, any>;
  }
) => {
  const {
    columns: originTableColumns = [],
    searchColumns: originSearchColumns = [],
    actionRef: originActionRef,
    formRef: originFormRef,
    beforeSearchSubmit,
    ...restProps
  } = props;

  const actionRef = useRef<ActionType>(undefined);
  const formRef = useRef<ProFormInstance>(undefined);

  // 日期格式化函数UTC
  const formDateFormatter = (value: dayjs.Dayjs) => {
    if (!value) {
      return '';
    }
    const dayjsVal = dayjs(value);
    const res = dayjsVal.toISOString();
    return res;
  };

  // 暴露 actionRef 给父组件
  useImperativeHandle(originActionRef, () => {
    return {
      ...(actionRef.current as any),
    };
  }, []);

  // 暴露 formRef 给父组件
  useImperativeHandle(originFormRef, () => {
    return {
      ...(formRef.current as any),
    };
  }, []);

  // 表格列配置（隐藏在搜索表单中）
  const tableColumns = useMemo<ProColumns<DataType, ValueType>[]>(() => {
    return originTableColumns.map(col => ({
      hideInSearch: true,
      ...col,
    }));
  }, [originTableColumns]);

  // 搜索列配置（隐藏在表格中，自动添加 placeholder 和 transform）
  const searchColumns = useMemo<ProColumns<DataType, ValueType>[]>(() => {
    return originSearchColumns.map(col =>
      merge(
        {
          hideInTable: true,
          search: {
            transform: transformMap[
              col.valueType as keyof typeof transformMap
            ]?.(col as any),
          },
          fieldProps: {
            placeholder: createPlaceholder(col as any),
          },
          proFieldProps: {
            valueTypeMap,
          },
        },
        col
      )
    );
  }, [originSearchColumns]);

  // 合并表格列和搜索列
  const calcColumns: ProTableProps<DataType, Params, ValueType>['columns'] =
    useMemo(() => {
      return [...tableColumns, ...searchColumns];
    }, [tableColumns, searchColumns]);

  return (
    <ProTable
      {...restProps}
      rowKey={restProps?.rowKey ?? 'id'}
      pagination={{
        showSizeChanger: true,
        showTotal: total => <div>Total {total} items</div>,
        ...restProps?.pagination,
      }}
      actionRef={actionRef}
      options={false}
      scroll={{
        x: 'max-content',
        ...restProps?.scroll,
      }}
      bordered
      cardProps={false}
      search={{
        layout: 'vertical',
        style: {
          padding: '0px',
        },
        searchGutter: [10, 10],
        ...restProps?.search,
      }}
      dateFormatter={restProps.dateFormatter ?? formDateFormatter}
      form={{
        onValuesChange: () => formRef.current?.submit(),
        ...restProps?.form,
      }}
      beforeSearchSubmit={params => {
        if (beforeSearchSubmit) {
          return beforeSearchSubmit(params);
        }
        return params;
      }}
      onLoad={dataSource => {
        restProps?.onLoad?.(dataSource);
      }}
      debounceTime={300}
      formRef={formRef}
      columns={calcColumns}
    />
  );
};

export default BaseTable;
