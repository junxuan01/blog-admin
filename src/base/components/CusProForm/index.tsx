'use client';

import { ProForm } from '@ant-design/pro-components';
import type { GetProps } from 'antd';
import dayjs from 'dayjs';

type IProFormProps<T = Record<string, any>> = GetProps<typeof ProForm<T>>;

/**
 * Date formatter for form fields
 */
export const formDateFormatter = (value: dayjs.Dayjs) => {
  if (!value) {
    return '';
  }
  const dayjsVal = dayjs(value);
  const res = dayjsVal.toISOString();
  return res;
};

/**
 * Custom ProForm with default configurations
 */
export function CusProForm<T>(props: IProFormProps<T>) {
  return (
    <ProForm<T>
      scrollToFirstError={{
        behavior: 'auto',
        block: 'center',
        scrollMode: 'always',
        focus: true,
      }}
      colProps={{
        span: 12,
      }}
      dateFormatter={formDateFormatter}
      {...props}
    />
  );
}
