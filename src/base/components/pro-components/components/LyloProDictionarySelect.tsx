// import {
//   type ProColumns,
//   ProFormField,
//   type ProFormItemProps,
//   type ProRenderFieldPropsType,
//   type SearchTransformKeyFn,
// } from '@ant-design/pro-components';
// import type { InputRef } from 'antd';
// import { set } from 'lodash';
// import type { DictionarySelectProps } from '@/base/components/dictionary-select';
// import { DictionarySelect } from '@/base/components/dictionary-select';
// 
// export const LyloProDictionarySelectValueType =
//   '_LyloDictionarySelect' as const;
// 
// /**
//  * LyloProDictionarySelect component - ProForm field for DictionarySelect
//  *
//  * @example
//  * ```tsx
//  * <LyloProDictionarySelect
//  *   name="business_unit"
//  *   label="Business Unit"
//  *   fieldProps={{ category: 'business_units' }}
//  * />
//  * ```
//  */
// export const LyloProDictionarySelect: React.FC<
//   ProFormItemProps<DictionarySelectProps, InputRef>
// > = ({
//   fieldProps,
//   proFieldProps,
//   ...rest
// }: ProFormItemProps<DictionarySelectProps, InputRef>) => {
//   return (
//     <ProFormField
//       valueType={LyloProDictionarySelectValueType}
//       fieldProps={fieldProps}
//       filedConfig={
//         {
//           valueType: LyloProDictionarySelectValueType,
//         } as any
//       }
//       proFieldProps={proFieldProps}
//       {...rest}
//     />
//   );
// };
// 
// /**
//  * Transform creator for search params
//  */
// export const LyloProDictionarySelectTransformCreator: (
//   col: ProColumns
// ) => SearchTransformKeyFn = () => {
//   return (originValue, namePath) => {
//     const value = originValue;
//     const target = {};
//     set(target, namePath, value);
//     return target;
//   };
// };
// 
// /**
//  * Render configuration for ProTable
//  */
// export const LyloProDictionarySelectRenderConfig: ProRenderFieldPropsType = {
//   renderFormItem: (_text, props) => {
//     return <DictionarySelect {...props.fieldProps} />;
//   },
//   render: (text, _props) => {
//     return <div>{text}</div>;
//   },
// };
