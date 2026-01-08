import type { Dayjs } from 'dayjs';

import { useCallback, useMemo, useState } from 'react';
import { useSingaporeDate } from './useSingaporeDate';

export const useBlackoutDates = (form: any) => {
  const { getSingaporeDayjs } = useSingaporeDate();
  const [blackoutInfos, setBlackoutInfos] = useState([]);

  // 禁用日期
  const blackoutDateList = useMemo<string[]>(() => {
    const disabledDates: string[] = [];
    for (const item of blackoutInfos as {
      from_time: string;
      end_time: string;
    }[]) {
      let start = getSingaporeDayjs(item.from_time);
      const end = getSingaporeDayjs(item.end_time);
      while (!start.isAfter(end, 'day')) {
        disabledDates.push(start.format('YYYY-MM-DD'));
        start = start.add(1, 'day');
      }
    }
    return Array.from(new Set(disabledDates));
  }, [blackoutInfos, getSingaporeDayjs]);

  // 获取blackoutDates
  const getBlackoutDatesRequest = useCallback(
    async (params: { airportType: any }) => {
      const airportType = form?.airportType || params?.airportType;
      if (!airportType) {
        return;
      }
      // const result = await getBlackoutDates({
      //   service_type: airportType,
      // });
      setBlackoutInfos([]);
    },
    [form?.airportType]
  );

  // 禁用时间
  function disabledBlackoutDates(current: Dayjs) {
    return blackoutDateList.includes(current.format('YYYY-MM-DD'));
  }

  return {
    blackoutDateList,
    disabledBlackoutDates,
    getBlackoutDatesRequest,
  };
};
