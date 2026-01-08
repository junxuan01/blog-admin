# Pro Components 自定义组件系统

这是一套基于 Ant Design Pro Components 的自定义组件扩展系统,参考 PHV Admin Portal 的设计,提供统一的表单组件复用和数据转换机制。

## 核心概念

### 1. 组件三要素

每个自定义 Pro 组件需要提供三个核心部分:

- **ValueType**: 唯一标识符(如 `'_Search'`)
- **TransformCreator**: 搜索参数转换函数
- **RenderConfig**: 渲染配置(表单/展示模式)

### 2. 目录结构

```
pro_components/
├── components/        # 组件实现
│   ├── ProSearch.tsx
│   ├── ProCusDateRange.tsx
│   └── ProPhone.tsx
├── index.ts          # 统一导出和配置
└── README.md
```

## 使用指南

### 在 searchColumns 中使用

```tsx
import BaseTable from '@/base/components/BaseTable';

<BaseTable
  searchColumns={[
    {
      title: 'Search',
      dataIndex: 'search',
      valueType: '_Search',  // 使用自定义组件
    },
    {
      title: 'Date Range',
      dataIndex: 'dateRange',
      valueType: '_CusDateRange',  // 自定义日期范围
    },
  ]}
  // ...
/>
```

### 自动功能

使用自定义 valueType 后,BaseTable 会自动处理:

1. **Placeholder**: 根据 `placeholderMap` 自动生成
2. **参数转换**: 通过 `transformMap` 转换搜索参数
3. **组件渲染**: 使用 `valueTypeMap` 配置的渲染逻辑

## 创建新组件

### 步骤 1: 创建组件文件

在 `components/` 目录下创建新文件,例如 `ProCustomSelect.tsx`:

```tsx
import {
  type ProColumns,
  ProFormField,
  type ProFormItemProps,
  type ProRenderFieldPropsType,
  type SearchTransformKeyFn,
} from '@ant-design/pro-components';
import { Select, type SelectProps } from 'antd';
import { set } from 'lodash';
import type React from 'react';

// 1. 定义 ValueType
export const ProCustomSelectValueType = '_CustomSelect' as const;

// 2. 定义组件
export const ProCustomSelect: React.FC<ProFormItemProps<SelectProps>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}) => {
  return (
    <ProFormField
      valueType={ProCustomSelectValueType}
      fieldProps={fieldProps}
      filedConfig={{ valueType: ProCustomSelectValueType } as any}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

// 3. 定义参数转换函数
export const ProCustomSelectTransformCreator: (
  col: ProColumns
) => SearchTransformKeyFn = () => {
  return (value, namePath) => {
    // 自定义转换逻辑
    return set({}, namePath, value);
  };
};

// 4. 定义渲染配置
export const ProCustomSelectRenderConfig: ProRenderFieldPropsType = {
  // 表单模式渲染
  renderFormItem: (_text, props) => {
    return <Select {...props.fieldProps} />;
  },
  // 展示模式渲染
  render: (text, _props) => {
    return <div>{text}</div>;
  },
};
```

### 步骤 2: 注册到 index.ts

```tsx
// 1. 导入
import {
  ProCustomSelectRenderConfig,
  ProCustomSelectTransformCreator,
  ProCustomSelectValueType,
} from './components/ProCustomSelect';

// 2. 添加到类型定义
export type CusProComponentsPureType =
  | typeof ProCustomSelectValueType
  | // ... 其他类型
  ;

// 3. 添加 placeholder
const placeholderMap = {
  [ProCustomSelectValueType]: 'Please Select',
  // ...
};

// 4. 添加 transform
export const transformMap = {
  [ProCustomSelectValueType]: ProCustomSelectTransformCreator,
  // ...
};

// 5. 添加渲染配置
export const valueTypeMap = {
  [ProCustomSelectValueType]: ProCustomSelectRenderConfig,
  // ...
};
```

### 步骤 3: 使用新组件

```tsx
<BaseTable
  searchColumns={[
    {
      title: 'Custom Select',
      dataIndex: 'customSelect',
      valueType: '_CustomSelect',
      fieldProps: {
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
    },
  ]}
/>
```

## 已有组件

### ProSearch (`_Search`)
- **用途**: 搜索输入框
- **转换**: 原值传递
- **示例**:
```tsx
{
  title: 'Search',
  dataIndex: 'search',
  valueType: '_Search',
}
```

### ProCusDateRange (`_CusDateRange`)
- **用途**: 日期范围选择器
- **转换**: 转换为 ISO 字符串数组
- **示例**:
```tsx
{
  title: 'Date Range',
  dataIndex: 'dateRange',
  valueType: '_CusDateRange',
  fieldProps: {
    placeholder: ['Start', 'End'],
  },
}
```

### ProPhone (`_Phone`)
- **用途**: 电话号码输入
- **转换**: 原值传递
- **示例**:
```tsx
{
  title: 'Phone',
  dataIndex: 'phone',
  valueType: '_Phone',
}
```

## 参数转换 (Transform)

Transform 函数负责将表单值转换为 API 请求参数:

```tsx
export const ProCusDateRangeTransformCreator = () => {
  return (value, namePath) => {
    // value: 用户选择的日期范围 [dayjs, dayjs]
    // namePath: 字段路径,如 'startTime'
    // 返回: { startTime: ['2024-01-01T00:00:00.000Z', '2024-01-31T23:59:59.999Z'] }
    return set(
      {},
      namePath,
      Array.isArray(value) ? value.map(formDateFormatter) : []
    );
  };
};
```

## 最佳实践

1. **命名规范**: ValueType 使用 `_` 前缀,如 `_Search`, `_CustomSelect`
2. **类型安全**: 使用 TypeScript 严格类型检查
3. **组件复用**: 尽可能复用已有组件
4. **参数转换**: 保持转换逻辑简单清晰
5. **文档更新**: 添加新组件后更新此文档

## 与 PHV 的差异

1. **组件库**: PHV 有更多业务特定组件(如 ProSales, ProDriver 等)
2. **枚举配置**: PHV 通过 API 获取枚举配置,当前实现使用静态配置
3. **功能范围**: 当前实现为基础版本,可根据需要扩展

## 扩展建议

未来可以添加的组件:

- `ProBooleanSelect`: 布尔值选择器
- `ProNumberRange`: 数字范围输入
- `ProCorporate`: 公司选择器(带搜索)
- `ProStatus`: 状态选择器
- `ProUpload`: 文件上传组件

根据业务需求逐步添加。
