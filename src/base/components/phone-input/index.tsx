import usePhoneCountryConfig from '@hooks/usePhoneCountryConfig';
import type { InputProps } from 'antd';
import { Input, Select, Space } from 'antd';
import { sortBy, uniqBy } from 'lodash';
import { useMemo } from 'react';

export interface PhoneInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: Record<string, string>;
  onChange?: (value: Record<string, string>) => void;
  countryCodeKey?: string;
  phoneNumberKey?: string;
  contactNumberKey?: string;
}

/** 格式化区号（确保有+号） */
const normalizeCountryCode = (code?: string): string => {
  if (!code) return '';
  const str = String(code).trim();
  return /^\+?\d+$/.test(str) ? (str.startsWith('+') ? str : `+${str}`) : str;
};

/** 国旗图标组件 */
const FlagIcon = ({ src }: { src?: string }) => (
  <div
    className='h-5 w-5 bg-contain bg-center bg-no-repeat'
    style={src ? { backgroundImage: `url(${src})` } : undefined}
  />
);

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  countryCodeKey = 'phone_country_code',
  phoneNumberKey = 'phone_number',
  contactNumberKey = 'contact_no',
  disabled,
  ...inputProps
}) => {
  const { config, isLoading } = usePhoneCountryConfig();

  // 派生：国家选项列表
  const options = useMemo(() => {
    const list =
      config?.country_codes?.map(item => ({
        value: item.region,
        label: item.flag_path,
        origin: item,
      })) ?? [];
    return sortBy(uniqBy(list, 'value'), o =>
      Number(o.value?.replace('+', ''))
    );
  }, [config]);

  // 派生：当前区号（直接从 value 计算，无需 state）
  const countryCode = useMemo(() => {
    const normalized = normalizeCountryCode(value?.[countryCodeKey]);
    return normalized || '+65'; // 默认新加坡
  }, [value, countryCodeKey]);

  // 派生：当前电话号码（直接从 value 读取）
  const phoneNumber = value?.[phoneNumberKey] ?? '';

  // 统一触发 onChange
  const emitChange = (code: string, phone: string) => {
    onChange?.({
      [countryCodeKey]: code,
      [phoneNumberKey]: phone,
      [contactNumberKey]: `${code}${phone}`,
    });
  };

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Select
        disabled={disabled}
        loading={isLoading}
        value={countryCode}
        options={options}
        popupMatchSelectWidth={false}
        style={{ width: 110 }}
        labelRender={({ label, value }) => (
          <div className='flex items-center gap-1'>
            <FlagIcon src={label as string} />
            <span>{value}</span>
          </div>
        )}
        optionRender={({ data, value }) => (
          <div className='flex items-center gap-2'>
            <FlagIcon src={data?.origin?.flag_path} />
            <span>{value}</span>
          </div>
        )}
        onChange={code => emitChange(code, phoneNumber)}
      />
      <Input
        {...inputProps}
        disabled={disabled}
        allowClear
        placeholder='Please enter phone number'
        value={phoneNumber}
        onChange={e => emitChange(countryCode, e.target.value)}
      />
    </Space.Compact>
  );
};
