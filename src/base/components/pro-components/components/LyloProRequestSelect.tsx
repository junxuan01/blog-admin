import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { set } from 'lodash';
import type { RequestSelectProps } from '@/base/components/request-select';
import { RequestSelect } from '@/base/components/request-select';

export const LyloProRequestSelectValueType = '_LyloRequestSelect' as const;

/**
 * LyloProRequestSelect component - ProForm field for RequestSelect
 *
 * @example
 * ```tsx
 * <LyloProRequestSelect
 *   name="user_id"
 *   label="User"
 *   fieldProps={{
 *     cacheKey: 'userSelect',
 *     request: async ({ searchValue, current, pageSize }) => {
 *       const res = await api.getUsers({ search: searchValue, page: current, size: pageSize });
 *       return {
 *         data: res.list.map(u => ({ label: u.name, value: u.id, origin: u })),
 *         total: res.total,
 *         success: true
 *       };
 *     },
 *     remoteSearch: true
 *   }}
 * />
 * ```
 */
export const LyloProRequestSelect: React.FC<
  ProFormItemProps<RequestSelectProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<RequestSelectProps, InputRef>) => {
  return (
    <ProFormField
      valueType={LyloProRequestSelectValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: LyloProRequestSelectValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

/**
 * Transform creator for search params
 */
export const LyloProRequestSelectTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (originValue, namePath) => {
    const value = originValue;
    const target = {};
    set(target, namePath, value);
    return target;
  };
};

/**
 * Render configuration for ProTable
 */
export const LyloProRequestSelectRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <RequestSelect {...props.fieldProps} />;
  },
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
