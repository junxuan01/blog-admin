# DictionarySelect & RequestSelect

通用 Select 组件库，提供字典选择和异步请求选择两种模式，支持与 ProComponents 无缝集成。

## 架构设计

```
useDictionary (hook)
   ↓
DictionarySelect (基础组件)
   ↓
LyloProDictionarySelect (Pro 组件)
   ↓
BusinessUnitSelect (业务组件)
```

## 一、DictionarySelect - 字典选择组件

### 功能特性

- ✅ 基于 `useDictionary` hook 统一管理企业配置
- ✅ 支持选项过滤、转换、禁用
- ✅ 支持编辑/只读模式
- ✅ 自动缓存（24小时）
- ✅ 类型安全的 category 提示

### 基础用法

```tsx
import { DictionarySelect } from '@/base/components/DictionarySelect';

// 最简单用法
<DictionarySelect category="business_units" />

// 带值和变更处理
<DictionarySelect
  category="payment_methods"
  value={paymentMethod}
  onChange={(val) => setPaymentMethod(val)}
/>

// 只读模式
<DictionarySelect
  category="business_units"
  value="1"
  renderMode="read"
/>
```

### 高级用法

```tsx
// 过滤选项
<DictionarySelect
  category="payment_methods"
  filterOptionItem={(option) => option.value !== 'CASH'}
/>

// 转换选项
<DictionarySelect
  category="business_units"
  transformOptionItem={(option) => ({
    ...option,
    label: `${option.label} (${option.value})`,
  })}
/>

// 禁用特定选项
<DictionarySelect
  category="payment_methods"
  disableOptionItem={(option) => option.value === 'DEPRECATED'}
/>
```

### ProComponents 集成

```tsx
import { BaseTable } from '@/base/components/BaseTable';

const columns = [
  {
    title: 'Business Unit',
    dataIndex: 'business_unit',
    valueType: '_LyloDictionarySelect',
    fieldProps: {
      category: 'business_units',
    },
  },
];

// 在 searchColumns 中使用
const searchColumns = [
  {
    title: 'Payment Method',
    dataIndex: 'payment_method',
    valueType: '_LyloDictionarySelect',
    fieldProps: {
      category: 'payment_methods',
    },
  },
];
```

### 业务组件封装

```tsx
// BusinessUnitSelect.tsx
import { DictionarySelect, DictionarySelectProps } from '@/base/components/DictionarySelect';

export type BusinessUnitSelectProps = Omit<DictionarySelectProps, 'category'>;

export const BusinessUnitSelect: React.FC<BusinessUnitSelectProps> = (props) => {
  return <DictionarySelect category="business_units" {...props} />;
};

// 使用
<BusinessUnitSelect value="1" onChange={handleChange} />
```

## 二、RequestSelect - 异步请求选择组件

### 功能特性

- ✅ 支持异步数据请求
- ✅ 分页支持
- ✅ 远程搜索（防抖）
- ✅ SessionStorage 缓存
- ✅ 单选/多选模式
- ✅ 自动合并已选项、初始项、缓存项
- ✅ 支持隐藏和禁用选项

### 基础用法

```tsx
import { RequestSelect } from '@/base/components/RequestSelect';

<RequestSelect
  cacheKey="userSelect"
  request={async ({ searchValue, current, pageSize }) => {
    const res = await api.getUsers({
      search: searchValue,
      page: current,
      size: pageSize,
    });
    return {
      data: res.list.map((user) => ({
        label: user.name,
        value: user.id,
        origin: user,
      })),
      total: res.total,
      success: true,
    };
  }}
/>
```

### 远程搜索

```tsx
<RequestSelect
  cacheKey="driverSelect"
  remoteSearch // 启用远程搜索
  request={async ({ searchValue, ...params }) => {
    // searchValue 会在用户输入时传入（防抖500ms）
    const res = await api.searchDrivers({
      keyword: searchValue,
      ...params,
    });
    return {
      data: res.list.map((d) => ({
        label: `${d.name} (${d.phone})`,
        value: d.id,
        origin: d,
      })),
      total: res.total,
      success: true,
    };
  }}
/>
```

### 多选模式

```tsx
<RequestSelect
  mode="multiple"
  cacheKey="categoriesSelect"
  request={async ({ exist_id, ...params }) => {
    // exist_id 会包含当前已选中的值（逗号分隔）
    const res = await api.getCategories({
      ids: exist_id,
      ...params,
    });
    return {
      data: res.list.map((c) => ({
        label: c.name,
        value: c.id,
        origin: c,
      })),
      total: res.total,
      success: true,
    };
  }}
/>
```

### 自定义选项处理

```tsx
<RequestSelect
  cacheKey="productSelect"
  request={fetchProducts}
  // 禁用特定选项
  disabledOptionItem={(option) => option.origin.stock === 0}
  // 隐藏特定选项
  hiddenOptionItem={(option) => option.origin.deleted}
  // 自定义标签渲染
  customLabelRender={(props, option) => (
    <div>
      {props.label}
      <span style={{ color: 'gray' }}>
        {option.origin.stock} in stock
      </span>
    </div>
  )}
/>
```

### ProComponents 集成

```tsx
const searchColumns = [
  {
    title: 'Assigned User',
    dataIndex: 'user_id',
    valueType: '_LyloRequestSelect',
    fieldProps: {
      cacheKey: 'userSelect',
      remoteSearch: true,
      request: async ({ searchValue, current, pageSize }) => {
        const res = await userApi.list({
          search: searchValue,
          page: current,
          size: pageSize,
        });
        return {
          data: res.list.map((u) => ({
            label: u.name,
            value: u.id,
            origin: u,
          })),
          total: res.total,
          success: true,
        };
      },
    },
  },
];
```

### 业务组件封装

```tsx
// UserSelect.tsx
import { RequestSelect, RequestSelectProps } from '@/base/components/RequestSelect';
import { useCallback } from 'react';
import userApi from '@/base/api/user';

export type UserSelectProps = Omit<RequestSelectProps, 'request' | 'cacheKey'>;

export const UserSelect: React.FC<UserSelectProps> = (props) => {
  const request = useCallback<RequestSelectProps['request']>(
    async ({ searchValue, current, pageSize }) => {
      const res = await userApi.list({
        search: searchValue,
        page: current,
        size: pageSize,
      });
      return {
        data: res.list.map((user) => ({
          label: user.name,
          value: user.id,
          origin: user,
        })),
        total: res.total,
        success: true,
      };
    },
    []
  );

  return <RequestSelect request={request} cacheKey="userSelect" {...props} />;
};

// 使用
<UserSelect remoteSearch value={userId} onChange={handleChange} />
```

## 三、useDictionary Hook

### 功能

统一管理企业配置（business_units, payment_methods 等），提供类型安全的 category 访问。

### 用法

```tsx
import { useDictionary } from '@/base/hook/useDictionary';

const MyComponent = () => {
  const { loading, categoryGroup } = useDictionary();

  if (loading) return <Spin />;

  const businessUnits = categoryGroup?.business_units || [];
  const paymentMethods = categoryGroup?.payment_methods || [];

  return (
    <div>
      {businessUnits.map((unit) => (
        <div key={unit.value}>{unit.label}</div>
      ))}
    </div>
  );
};
```

### 数据结构

```typescript
// 返回格式
interface DictionaryOption {
  label: string;
  value: string;
  [key: string]: any;
}

type DictionaryGroup = {
  business_units: DictionaryOption[];
  payment_methods: DictionaryOption[];
  // ... 其他 category
};
```

## 四、最佳实践

### 1. 统一业务组件封装

为每个常用的选择场景创建专用组件：

```tsx
// src/base/components/BusinessUnitSelect/index.tsx
export const BusinessUnitSelect = (props) => (
  <DictionarySelect category="business_units" {...props} />
);

// src/base/components/UserSelect/index.tsx
export const UserSelect = (props) => (
  <RequestSelect cacheKey="userSelect" request={fetchUsers} {...props} />
);
```

**优点：**
- 统一接口调用逻辑
- 便于全局修改
- 代码复用性高

### 2. API 请求标准化

统一 RequestSelect 的 request 函数格式：

```tsx
// api/user.ts
class UserApi {
  // 配合 RequestSelect 使用，使用箭头函数保持 this 上下文
  public listForSelect = async (params: {
    searchValue?: string;
    current: number;
    pageSize: number;
    exist_id?: string;
  }) => {
    const res = await this.api.get('user/list', {
      search: params.searchValue,
      page: params.current,
      size: params.pageSize,
      ids: params.exist_id,
    });
    return {
      data: res.list.map((user) => ({
        label: user.name,
        value: user.id,
        origin: user,
      })),
      total: res.total,
      success: true,
    };
  };
}
```

### 3. ProTable 集成模式

```tsx
const columns = [
  {
    title: 'Business Unit',
    dataIndex: 'business_unit',
    valueType: '_LyloDictionarySelect',
    fieldProps: {
      category: 'business_units',
    },
    // 自动支持 placeholder
    // 自动支持 transform
  },
  {
    title: 'Assigned User',
    dataIndex: 'user_id',
    valueType: '_LyloRequestSelect',
    fieldProps: {
      cacheKey: 'userSelect',
      remoteSearch: true,
      request: userApi.listForSelect,
    },
  },
];
```

### 4. 缓存策略

- **DictionarySelect**: 使用 ahooks `useRequest` 缓存，默认 24 小时
- **RequestSelect**:
  - SessionStorage 缓存选项列表
  - cacheKey 格式: `request-select:{cacheKey}:{JSON.stringify(params)}`
  - 打开下拉时自动刷新数据

### 5. 性能优化

```tsx
// ✅ 推荐：使用 useCallback 包装 request 函数
const request = useCallback<RequestSelectProps['request']>(
  async (params) => {
    // ...
  },
  [依赖项]
);

// ✅ 推荐：远程搜索（减少初始加载数据量）
<RequestSelect remoteSearch pageSize={20} />

// ✅ 推荐：合理设置 pageSize
<RequestSelect pageSize={100} /> // 小数据集
<RequestSelect pageSize={1000} remoteSearch /> // 大数据集 + 远程搜索
```

## 五、类型定义

### DictionarySelectProps

```typescript
interface DictionarySelectProps extends Omit<SelectProps, 'options'> {
  category: DictionaryCategory;
  filterOptionItem?: (option: DictionarySelectOption) => boolean;
  transformOptionItem?: (option: DictionarySelectOption) => DictionarySelectOption;
  disableOptionItem?: (option: DictionarySelectOption, disabled?: boolean) => boolean;
  renderMode?: 'edit' | 'read';
}
```

### RequestSelectProps

```typescript
interface RequestSelectProps<T = any> extends Omit<SelectProps, 'options' | 'popupRender'> {
  cacheKey: string;
  request: RequestSelectRequestFn<T>;
  params?: Record<string, any>;
  pageSize?: number;
  remoteSearch?: boolean;
  renderMode?: 'edit' | 'read';
  disabledOptionItem?: (option: RequestSelectDataItem<T>, disabled?: boolean) => boolean;
  hiddenOptionItem?: (option: RequestSelectDataItem<T>, hidden?: boolean) => boolean;
  customLabelRender?: (props: { label: string; value: string }, option: RequestSelectDataItem<T>) => React.ReactNode;
  popupRender?: (menu: React.ReactElement, arg: { searchLoading: boolean }) => React.ReactElement;
}
```

## 六、对比 PHV 的优化

| 特性 | PHV 实现 | Lylo-Admin 实现 | 优化点 |
|------|----------|-----------------|--------|
| Entity 依赖 | 强依赖 useEntity | 无依赖 | 简化使用，减少耦合 |
| 类型定义 | 基础类型 | 完整泛型支持 | 更好的类型推导 |
| 缓存策略 | SessionStorage | ahooks + SessionStorage | 更智能的缓存管理 |
| 组件命名 | DictionarySelect | Lylo 前缀系列 | 统一命名规范 |
| 文档 | 分散 | 集中式文档 | 更易维护 |

## 七、常见问题

### Q: 为什么 request 函数要用箭头函数？

**A:** 当使用类方法作为 request 时，需要保持 `this` 上下文：

```tsx
// ❌ 错误：this 丢失
<RequestSelect request={userApi.listForSelect} />

// ✅ 正确：使用箭头函数包装
<RequestSelect request={() => userApi.listForSelect()} />

// ✅ 正确：在 API 类中定义为箭头函数
class UserApi {
  public listForSelect = async (params) => { /* ... */ };
}
```

### Q: DictionarySelect 的数据从哪里来？

**A:** 从 `commonApi.getEnterpriseConfig()` 获取，返回：

```json
{
  "business_units": [
    { "label": "Personal Rental", "value": "1" },
    { "label": "PHV Rental", "value": "2" }
  ],
  "payment_methods": [
    { "label": "Credit Card", "value": "CREDIT_CARD" },
    { "label": "Bank Transfer", "value": "BANK_TRANSFER" }
  ]
}
```

### Q: 如何添加新的 dictionary category？

**A:**
1. 后端在 `enterprise/config` 接口添加新字段
2. 更新 `EnterpriseConfigEntity` 类型定义
3. TypeScript 会自动识别新的 category
4. 创建对应的业务组件（可选）

### Q: RequestSelect 如何处理大数据集？

**A:** 使用远程搜索 + 分页：

```tsx
<RequestSelect
  remoteSearch // 用户输入时才搜索
  pageSize={20} // 小分页
  request={async ({ searchValue, current, pageSize }) => {
    // 后端分页 + 搜索
    return await api.search({ keyword: searchValue, page: current, size: pageSize });
  }}
/>
```

## 八、完整示例

查看以下文件了解完整用法：
- `src/base/components/BusinessUnitSelect/index.tsx`
- `src/base/components/PaymentMethodSelect/index.tsx`
- `src/app/[env]/order/(enterprise)/EnterpriseOrderPage.tsx`
