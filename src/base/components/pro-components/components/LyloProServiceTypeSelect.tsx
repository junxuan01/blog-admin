import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { set } from 'lodash';
import { getServiceTypeOptions } from '@/base/api/user';
import type { RequestSelectProps } from '@/base/components/request-select';
import { RequestSelect } from '@/base/components/request-select';

export const LyloProServiceTypeSelectValueType =
  '_LyloServiceTypeSelect' as const;

/**
 * Shared request function for service type options
 */
const serviceTypeRequest = async () => {
  const res = await getServiceTypeOptions();
  return {
    data: res.service_type_configs.map(item => ({
      label: item.label,
      value: item.value,
      origin: item,
    })),
    total: res.service_type_configs.length,
    success: true,
  };
};

/**
 * LyloProServiceTypeSelect component - ProForm field for service type selection
 *
 * @example
 * ```tsx
 * // Basic usage in ProTable searchColumns
 * {
 *   title: 'Service Type',
 *   dataIndex: 'service_type',
 *   valueType: '_LyloServiceTypeSelect',
 * }
 *
 * // In ProForm
 * <LyloProServiceTypeSelect
 *   name="service_type"
 *   label="Service Type"
 * />
 * ```
 */
export const LyloProServiceTypeSelect: React.FC<
  ProFormItemProps<Omit<RequestSelectProps, 'cacheKey' | 'request'>, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<
  Omit<RequestSelectProps, 'cacheKey' | 'request'>,
  InputRef
>) => {
  return (
    <ProFormField
      valueType={LyloProServiceTypeSelectValueType}
      fieldProps={{
        cacheKey: 'serviceTypeSelect',
        request: serviceTypeRequest,
        params: undefined, // 明确设置为 undefined，避免默认空对象
        ...fieldProps,
      }}
      filedConfig={
        {
          valueType: LyloProServiceTypeSelectValueType,
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
export const LyloProServiceTypeSelectTransformCreator: (
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
export const LyloProServiceTypeSelectRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return (
      <RequestSelect
        cacheKey='serviceTypeSelect'
        request={serviceTypeRequest}
        {...props.fieldProps}
      />
    );
  },
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
