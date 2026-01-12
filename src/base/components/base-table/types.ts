import type { ParamsType, ProTableProps } from '@ant-design/pro-components';

/**
 * BaseTable 组件属性类型
 */
export type BaseTableProps<
  DataType extends Record<string, any> = any,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
> = ProTableProps<DataType, Params, ValueType> & {
  /**
   * 搜索表单提交前的数据处理
   */
  beforeSearchSubmit?: (data: Record<string, any>) => Record<string, any>;
};

/**
 * 表格状态类型
 */
export interface TableState {
  current: number;
  pageSize: number;
  sorter?: Record<string, any>;
  filters?: Record<string, any>;
}
