import dayjs from 'dayjs';
// import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';

export const useDayjsConfig = () => {
  useEffect(() => {
    // dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    // 设置默认时区，确保服务端和客户端一致
    dayjs.tz.setDefault('Asia/Shanghai');

    // dayjs.updateLocale("en", {
    //   weekStart: 1,
    // });
  }, []);
};
