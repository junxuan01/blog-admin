// import type { DictionaryCategory } from '@hooks/useDictionary';
// import { useDictionary } from '@hooks/useDictionary';
// import type { GetProps } from 'antd';
// import { Select } from 'antd';
// import { useMemo } from 'react';

// type SelectProps = GetProps<typeof Select<string>>;

// /**
//  * Dictionary select option
//  */
// export interface DictionarySelectOption {
//   label: string;
//   value: string;
//   origin?: any;
//   disabled?: boolean;
// }

// /**
//  * DictionarySelect component props
//  */
// export interface DictionarySelectProps extends Omit<SelectProps, 'options'> {
//   /**
//    * Dictionary category key
//    */
//   category: DictionaryCategory;

//   /**
//    * Filter option items
//    */
//   filterOptionItem?: (option: DictionarySelectOption) => boolean;

//   /**
//    * Transform option items
//    */
//   transformOptionItem?: (
//     option: DictionarySelectOption
//   ) => DictionarySelectOption;

//   /**
//    * Disable specific option items
//    */
//   disableOptionItem?: (
//     option: DictionarySelectOption,
//     disabled?: boolean
//   ) => boolean;

//   /**
//    * Render mode - edit or read-only
//    * @default 'edit'
//    */
//   renderMode?: 'edit' | 'read';
// }

// const defaultFilterOptionItemLogic = () => true;

// /**
//  * DictionarySelect component - select from dictionary categories
//  *
//  * @example
//  * ```tsx
//  * // Basic usage
//  * <DictionarySelect category="business_units" />
//  *
//  * // With filters and transformations
//  * <DictionarySelect
//  *   category="payment_methods"
//  *   filterOptionItem={(option) => option.value !== 'CASH'}
//  *   transformOptionItem={(option) => ({ ...option, label: option.label.toUpperCase() })}
//  * />
//  *
//  * // Read-only mode
//  * <DictionarySelect category="business_units" value="1" renderMode="read" />
//  * ```
//  */
// export const DictionarySelect: React.FC<DictionarySelectProps> = props => {
//   const {
//     category,
//     renderMode = 'edit',
//     value,
//     filterOptionItem = defaultFilterOptionItemLogic,
//     transformOptionItem,
//     disableOptionItem,
//     ...reset
//   } = props;

//   const { loading, categoryGroup } = useDictionary();

//   /**
//    * Process options with filters and transformations
//    */
//   const options = useMemo<SelectProps['options']>(() => {
//     const baseData = categoryGroup?.[category] || [];
//     return baseData.filter(filterOptionItem).map(item => {
//       let option: DictionarySelectOption = {
//         value: item.value,
//         label: item.label,
//         origin: item,
//       };

//       if (transformOptionItem) {
//         option = transformOptionItem(option);
//       }

//       if (disableOptionItem) {
//         option.disabled = disableOptionItem(option, option?.disabled);
//       }

//       return option;
//     });
//   }, [
//     categoryGroup,
//     category,
//     filterOptionItem,
//     transformOptionItem,
//     disableOptionItem,
//   ]);

//   /**
//    * Read-only mode - display label only
//    */
//   if (renderMode === 'read') {
//     const label = options?.find(item => item.value === value)?.label;
//     return <>{label ?? value}</>;
//   }

//   return (
//     <Select
//       value={value}
//       loading={loading}
//       showSearch
//       allowClear
//       options={options}
//       optionFilterProp='label'
//       placeholder='Please Select'
//       {...reset}
//     />
//   );
// };
