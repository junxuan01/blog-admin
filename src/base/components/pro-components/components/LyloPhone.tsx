import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import { PhoneInput, type PhoneInputProps } from '@components/phone-input';
import type { InputRef } from 'antd';
import { set } from 'lodash';
import type React from 'react';

export const LyloPhoneValueType = '_LyloPhone' as const;

export const LyloPhone: React.FC<
  ProFormItemProps<PhoneInputProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<PhoneInputProps, InputRef>) => {
  return (
    <ProFormField
      valueType={LyloPhoneValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: LyloPhoneValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const LyloPhoneTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (originValue, namePath) => {
    const value = originValue;
    const target = {};
    set(target, namePath, value);
    return target;
  };
};

export const LyloPhoneRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <PhoneInput {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
