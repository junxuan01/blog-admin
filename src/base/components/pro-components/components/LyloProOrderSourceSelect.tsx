import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { set } from 'lodash';
import type { DictionarySelectProps } from '@/base/components/dictionary-select';
import { DictionarySelect } from '@/base/components/dictionary-select';

export const LyloProOrderSourceSelectValueType =
  '_LyloOrderSourceSelect' as const;

/**
 * LyloProOrderSourceSelect component - ProForm field for order source selection
 *
 * @example
 * ```tsx
 * // Basic usage in ProTable searchColumns
 * {
 *   title: 'Order Source',
 *   dataIndex: 'order_source',
 *   valueType: '_LyloOrderSourceSelect',
 * }
 *
 * // In ProForm
 * <LyloProOrderSourceSelect
 *   name="order_source"
 *   label="Order Source"
 * />
 * ```
 */
export const LyloProOrderSourceSelect: React.FC<
  ProFormItemProps<Omit<DictionarySelectProps, 'category'>, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<Omit<DictionarySelectProps, 'category'>, InputRef>) => {
  return (
    <ProFormField
      valueType={LyloProOrderSourceSelectValueType}
      fieldProps={{ category: 'order_source', ...fieldProps }}
      filedConfig={
        {
          valueType: LyloProOrderSourceSelectValueType,
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
export const LyloProOrderSourceSelectTransformCreator: (
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
export const LyloProOrderSourceSelectRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <DictionarySelect category='order_source' {...props.fieldProps} />;
  },
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
