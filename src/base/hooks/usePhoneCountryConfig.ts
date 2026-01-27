// import { getCountryList } from '@api/config/index';
// // import type { CountryEntity } from '@api/config/type';
// import { useQuery } from '@tanstack/react-query';

// const usePhoneCountryConfig = (options?: {
//   enabled?: boolean;
//   staleTime?: number;
// }) => {
//   // 使用React Query管理请求
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['phone-country-config-v2'],
//     queryFn: getCountryList,
//     staleTime: options?.staleTime || 60 * 1000 * 1, // 默认1分钟缓存
//     enabled: options?.enabled !== false,
//   });

//   return {
//     config: data,
//     isLoading,
//     error,
//   };
// };
// export default usePhoneCountryConfig;
