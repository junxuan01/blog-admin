import { type DictionaryCategory, useDictionary } from '@hooks/useDictionary';
import { type GetProps, Tag } from 'antd';
import type React from 'react';
import { useMemo } from 'react';

type TagProps = GetProps<typeof Tag>;

export type Color = TagProps['color'];

export type DictionaryTagProps = TagProps & {
  category: DictionaryCategory;
  value?: string;
};

export const DictionaryTag: React.FC<DictionaryTagProps> = props => {
  const { category, value, ...reset } = props;
  const { categoryGroup } = useDictionary();

  const options = useMemo(() => {
    if (!categoryGroup?.[category]) return [];
    return categoryGroup[category].map(item => ({
      value: item.value,
      label: item.label,
    }));
  }, [categoryGroup, category]);

  const valueLabel = useMemo(() => {
    if (!value) {
      return '';
    }
    const option = options.find(item => item.value === value);
    return option ? option.label : value;
  }, [options, value]);

  return <Tag {...reset}>{valueLabel}</Tag>;
};
