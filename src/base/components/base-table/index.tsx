import {
  type ActionType,
  type ParamsType,
  type ProFormInstance,
  ProTable,
  type ProTableProps,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import type React from 'react';

export type BaseTableActionType = ActionType;
export type BaseTableSearchForm = ProFormInstance;

/**
 * BaseTable 组件
 * 基于 ProTable 封装，提供统一的默认配置
 *
 * 核心特性：
 * 1. 统一的默认配置（分页、样式、滚动等）
 * 2. 双 Ref 支持（actionRef + formRef）
 * 3. 表单自动提交（onValuesChange + debounce）
 * 4. UTC 日期格式化
 */
const BaseTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: ProTableProps<DataType, Params, ValueType> & {
    actionRef?: React.Ref<BaseTableActionType | undefined>;
    formRef?: React.Ref<BaseTableSearchForm | undefined>;
    beforeSearchSubmit?: (data: Record<string, any>) => Record<string, any>;
  }
) => {
  const { actionRef, formRef, beforeSearchSubmit, ...restProps } = props;

  // 日期格式化函数 UTC
  const formDateFormatter = (value: dayjs.Dayjs) => {
    if (!value) {
      return '';
    }
    return dayjs(value).toISOString();
  };

  return (
    <ProTable
      {...restProps}
      rowKey={restProps?.rowKey ?? 'id'}
      size={restProps?.size ?? 'small'}
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
        onValuesChange: () => {
          if (formRef && 'current' in formRef) {
            formRef.current?.submit();
          }
        },
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
    />
  );
};

export default BaseTable;
