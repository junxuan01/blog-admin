import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import { DatePicker, type InputRef } from 'antd';
import dayjs from 'dayjs';
import { set } from 'lodash';
import type React from 'react';

const { RangePicker } = DatePicker;

export const LyloProDateRangeValueType = '_LyloDateRange' as const;

type RangePickerProps = React.ComponentProps<typeof RangePicker>;

export const LyloProDateRange: React.FC<
  ProFormItemProps<RangePickerProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormItemProps<RangePickerProps, InputRef>) => {
  return (
    <ProFormField
      valueType={LyloProDateRangeValueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType: LyloProDateRangeValueType,
        } as any
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

const formDateFormatter = (value: any) => {
  if (!value) return '';
  const dayjsVal = dayjs(value);
  return dayjsVal.toISOString();
};

export const LyloProDateRangeTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value, namePath) => {
    return set(
      {},
      namePath,
      Array.isArray(value) ? value?.map(formDateFormatter) : []
    );
  };
};

export const LyloProDateRangeRenderConfig: ProRenderFieldPropsType = {
  renderFormItem: (_text, props) => {
    return <RangePicker {...props.fieldProps} style={{ width: '100%' }} />;
  },
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
