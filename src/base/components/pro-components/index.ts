// import type {
//   ProColumns,
//   ProFieldValueType,
//   ProFormColumnsType,
//   ProRenderFieldPropsType,
//   SearchTransformKeyFn,
// } from '@ant-design/pro-components';
// import { isArray } from 'lodash';
// import {
//   ProDemoFieldRenderConfig,
//   ProDemoFieldTransformCreator,
//   ProDemoFieldValueType,
// } from './components/DemoField';
// import {
//   LyloPhoneRenderConfig,
//   LyloPhoneTransformCreator,
//   LyloPhoneValueType,
// } from './components/LyloPhone';
// import {
//   LyloProCarTypeSelectRenderConfig,
//   LyloProCarTypeSelectTransformCreator,
//   LyloProCarTypeSelectValueType,
// } from './components/LyloProCarTypeSelect';
// import {
//   LyloProDateRangeRenderConfig,
//   LyloProDateRangeTransformCreator,
//   LyloProDateRangeValueType,
// } from './components/LyloProDateRange';
// import {
//   LyloProDictionarySelectRenderConfig,
//   LyloProDictionarySelectTransformCreator,
//   LyloProDictionarySelectValueType,
// } from './components/LyloProDictionarySelect';
// import {
//   LyloProOrderPaymentStatusSelectRenderConfig,
//   LyloProOrderPaymentStatusSelectTransformCreator,
//   LyloProOrderPaymentStatusSelectValueType,
// } from './components/LyloProOrderPaymentStatusSelect';
// import {
//   LyloProOrderSourceSelectRenderConfig,
//   LyloProOrderSourceSelectTransformCreator,
//   LyloProOrderSourceSelectValueType,
// } from './components/LyloProOrderSourceSelect';
// import {
//   LyloProRequestSelectRenderConfig,
//   LyloProRequestSelectTransformCreator,
//   LyloProRequestSelectValueType,
// } from './components/LyloProRequestSelect';
// import {
//   LyloProSearchRenderConfig,
//   LyloProSearchTransformCreator,
//   LyloProSearchValueType,
// } from './components/LyloProSearch';

// export type CusProComponentsPureType =
//   | typeof ProDemoFieldValueType
//   | typeof LyloProSearchValueType
//   | typeof LyloProDateRangeValueType
//   | typeof LyloProDictionarySelectValueType
//   | typeof LyloProRequestSelectValueType
//   | typeof LyloProCarTypeSelectValueType
//   | typeof LyloProOrderSourceSelectValueType
//   | typeof LyloProOrderPaymentStatusSelectValueType
//   | typeof LyloPhoneValueType;

// export type CusProComponentsType = CusProComponentsPureType | ProFieldValueType;

// export type CusProFormColumnsType = ProFormColumnsType<
//   any,
//   CusProComponentsType
// >;

// const placeholderMap: Partial<Record<CusProComponentsType, string | string[]>> =
//   {
//     text: 'Please Enter',
//     dateRange: ['Start Date', 'End Date'],
//     select: 'Please Select',
//     [ProDemoFieldValueType]: 'Please Enter',
//     [LyloProSearchValueType]: 'Please Enter',
//     [LyloProDateRangeValueType]: ['Start Date', 'End Date'],
//     [LyloProDictionarySelectValueType]: 'Please Select',
//     [LyloProRequestSelectValueType]: 'Please Select',
//     [LyloProCarTypeSelectValueType]: 'Please Select',
//     [LyloProOrderSourceSelectValueType]: 'Please Select',
//     [LyloProOrderPaymentStatusSelectValueType]: 'Please Select',
//     [LyloPhoneValueType]: 'Please enter phone number',
//   };

// export const createPlaceholder = (
//   colMeta: CusProFormColumnsType,
//   sub?: string | string[]
// ) => {
//   const placeholder =
//     placeholderMap[colMeta?.valueType as CusProComponentsType];
//   const cusSub = sub ?? colMeta?.title?.toString();
//   if (placeholder) {
//     return isArray(placeholder)
//       ? placeholder.map((prev, index) => `${prev} ${sub?.[index] ?? ''}`)
//       : `${placeholder} ${cusSub}`;
//   }
//   return undefined;
// };

// export const transformMap: Partial<
//   Record<CusProComponentsType, (col: ProColumns) => SearchTransformKeyFn>
// > = {
//   [ProDemoFieldValueType]: ProDemoFieldTransformCreator,
//   [LyloProSearchValueType]: LyloProSearchTransformCreator,
//   [LyloProDateRangeValueType]: LyloProDateRangeTransformCreator,
//   [LyloProDictionarySelectValueType]: LyloProDictionarySelectTransformCreator,
//   [LyloProRequestSelectValueType]: LyloProRequestSelectTransformCreator,
//   [LyloProCarTypeSelectValueType]: LyloProCarTypeSelectTransformCreator,
//   [LyloProOrderSourceSelectValueType]: LyloProOrderSourceSelectTransformCreator,
//   [LyloProOrderPaymentStatusSelectValueType]:
//     LyloProOrderPaymentStatusSelectTransformCreator,
//   [LyloPhoneValueType]: LyloPhoneTransformCreator,
// };

// /**
//  * 自定义 valueMap
//  */
// export const valueTypeMap: Record<
//   CusProComponentsPureType,
//   ProRenderFieldPropsType
// > = {
//   [ProDemoFieldValueType]: ProDemoFieldRenderConfig,
//   [LyloProSearchValueType]: LyloProSearchRenderConfig,
//   [LyloProDateRangeValueType]: LyloProDateRangeRenderConfig,
//   [LyloProDictionarySelectValueType]: LyloProDictionarySelectRenderConfig,
//   [LyloProRequestSelectValueType]: LyloProRequestSelectRenderConfig,
//   [LyloProCarTypeSelectValueType]: LyloProCarTypeSelectRenderConfig,
//   [LyloProOrderSourceSelectValueType]: LyloProOrderSourceSelectRenderConfig,
//   [LyloProOrderPaymentStatusSelectValueType]:
//     LyloProOrderPaymentStatusSelectRenderConfig,
//   [LyloPhoneValueType]: LyloPhoneRenderConfig,
// };

// export default valueTypeMap;

// // Export components
// export { LyloProCarTypeSelect } from './components/LyloProCarTypeSelect';
// export { LyloProDateRange } from './components/LyloProDateRange';
// export { LyloProDictionarySelect } from './components/LyloProDictionarySelect';
// export { LyloProOrderPaymentStatusSelect } from './components/LyloProOrderPaymentStatusSelect';
// export { LyloProOrderSourceSelect } from './components/LyloProOrderSourceSelect';
// export { LyloProRequestSelect } from './components/LyloProRequestSelect';
// export { LyloProSearch } from './components/LyloProSearch';
