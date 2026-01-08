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

export const LyloProOrderPaymentStatusSelectValueType =
  '_LyloOrderPaymentStatusSelect' as const;

/**
 * LyloProOrderPaymentStatusSelect component - ProForm field for payment status selection
 *
 * @example
 * ```tsx
 * // Basic usage in ProTable searchColumns
 * {
 *   title: 'Payment Status',
 *   dataIndex: 'payment_status',
 *   valueType: '_LyloOrderPaymentStatusSelect',
 * }
 *
 * // In ProForm
 * <LyloProOrderPaymentStatusSelect
 *   name="payment_status"
 *   label="Payment Status"
 * />
 * ```
 */
export const LyloProOrderPaymentStatusSelect: React.FC<
  ProFormItemProps<Omit<DictionarySelectProps, 'category'>, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<Omit<DictionarySelectProps, 'category'>, InputRef>) => {
  return (
    <ProFormField
      valueType={LyloProOrderPaymentStatusSelectValueType}
      fieldProps={{ category: 'order_payment_status', ...fieldProps }}
      filedConfig={
        {
          valueType: LyloProOrderPaymentStatusSelectValueType,
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
export const LyloProOrderPaymentStatusSelectTransformCreator: (
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
export const LyloProOrderPaymentStatusSelectRenderConfig: ProRenderFieldPropsType =
  {
    renderFormItem: (_text, props) => {
      return (
        <DictionarySelect
          category='order_payment_status'
          {...props.fieldProps}
        />
      );
    },
    render: (text, _props) => {
      return <div>{text}</div>;
    },
  };
