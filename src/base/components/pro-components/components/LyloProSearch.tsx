import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import { Input, type InputProps, type InputRef } from 'antd';
import { set } from 'lodash';
import type React from 'react';

export const LyloProSearchValueType = '_LyloSearch' as const;

export const LyloProSearch: React.FC<
  ProFormItemProps<InputProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<InputProps, InputRef>) => {
  return (
    <ProFormField
      valueType={LyloProSearchValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: LyloProSearchValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const LyloProSearchTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (originValue, namePath) => {
    const value = originValue;
    const target = {};
    set(target, namePath, value);
    return target;
  };
};

export const LyloProSearchRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <Input.Search {...props.fieldProps} allowClear />;
  },
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
