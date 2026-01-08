// import { useQuery } from '@tanstack/react-query';
// import { useMemo } from 'react';
// import { useSingaporeDate } from './useSingaporeDate';

// export const useConfig = () => {
//   const { singaporeDayjs } = useSingaporeDate();

//   // 使用 useQuery 获取配置数据
//   const { data: result, isLoading } = useQuery({
//     queryKey: ['bookingConfig'],
//     queryFn: getBookingBarConfig,
//     staleTime: 1000 * 60 * 30, // 30分钟缓存
//   });

//   const airports = result?.data?.locations || [];
//   const leadTime = result?.data?.lead_time;

//   // 可以选择的日期和小时
//   const ableSelectTimeMap = useMemo(() => {
//     const ableSelectDates: string[] = [];
//     const ableSelectDateHoursMap: Record<string, number[]> = {};
//     if (leadTime) {
//       const { min_lead_time, max_lead_time } = leadTime;
//       let start = min_lead_time ? Number(min_lead_time) : 0;
//       const end = max_lead_time ? Number(max_lead_time) : start;

//       let startDate = singaporeDayjs.add(start, 'hour');
//       const endDate = singaporeDayjs.add(end, 'hour');

//       // 向上取整一小时
//       start = startDate.hour() + 1;
//       while (!startDate.isAfter(endDate, 'day')) {
//         const format = startDate.format('YYYY-MM-DD');
//         const endHour = startDate.isSame(endDate, 'day') ? endDate.hour() : 23;
//         ableSelectDates.push(format);
//         ableSelectDateHoursMap[format] = [];

//         while (start <= endHour) {
//           ableSelectDateHoursMap[format].push(start);
//           start++;
//         }
//         startDate = startDate.add(1, 'day');
//         start = 0;
//       }
//     }
//     return {
//       ableSelectDates,
//       ableSelectDateHoursMap,
//     };
//   }, [leadTime, singaporeDayjs]);

//   return {
//     airports,
//     ableSelectTimeMap,
//     leadTime,
//     isLoading,
//   };
// };
