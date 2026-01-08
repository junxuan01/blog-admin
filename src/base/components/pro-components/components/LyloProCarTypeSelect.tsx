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

export const LyloProCarTypeSelectValueType = '_LyloCarTypeSelect' as const;

/**
 * LyloProCarTypeSelect component - ProForm field for car type selection
 *
 * @example
 * ```tsx
 * // Basic usage in ProTable searchColumns
 * {
 *   title: 'Car Type',
 *   dataIndex: 'car_type',
 *   valueType: '_LyloCarTypeSelect',
 * }
 *
 * // In ProForm
 * <LyloProCarTypeSelect
 *   name="car_type"
 *   label="Car Type"
 * />
 * ```
 */
export const LyloProCarTypeSelect: React.FC<
  ProFormItemProps<Omit<DictionarySelectProps, 'category'>, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<Omit<DictionarySelectProps, 'category'>, InputRef>) => {
  return (
    <ProFormField
      valueType={LyloProCarTypeSelectValueType}
      fieldProps={{ category: 'car_types', ...fieldProps }}
      filedConfig={
        {
          valueType: LyloProCarTypeSelectValueType,
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
export const LyloProCarTypeSelectTransformCreator: (
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
export const LyloProCarTypeSelectRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <DictionarySelect category='car_types' {...props.fieldProps} />;
  },
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
