import { RedditOutlined } from '@ant-design/icons';
import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import { Input, type InputRef } from 'antd';
import { set } from 'lodash';
import type React from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const DemoField: React.FC<Props> = props => {
  return (
    <Input
      prefix={<RedditOutlined />}
      value={props.value}
      onChange={ev => props?.onChange(ev.target.value)}
    />
  );
};

export const ProDemoFieldValueType = '_DemoField' as const;

export const ProDemoField: React.FC<ProFormItemProps<Props, InputRef>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<Props, InputRef>) => {
  return (
    <ProFormField
      valueType={ProDemoFieldValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: ProDemoFieldValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export const ProDemoFieldTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value, namePath) => {
    return set({}, namePath, value);
  };
};

export const ProDemoFieldRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <DemoField {...props.fieldProps} />;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
