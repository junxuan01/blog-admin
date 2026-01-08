import type { ParamsType, ProTableProps } from '@ant-design/pro-components';
import type { CusProComponentsType } from '../pro-components';

/**
 * BaseTable 组件属性类型
 */
export type BaseTableProps<
  DataType extends Record<string, any> = any,
  Params extends ParamsType = ParamsType,
  ValueType = CusProComponentsType,
> = ProTableProps<DataType, Params, ValueType> & {
  /**
   * 搜索列配置（只在搜索表单中显示）
   */
  searchColumns?: ProTableProps<DataType, Params, ValueType>['columns'];

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
