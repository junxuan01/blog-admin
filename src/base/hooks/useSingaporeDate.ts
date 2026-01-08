import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// 新加披时区
export const singaporeTimezone = 8;

export const useSingaporeDate = () => {
  // 获取新加坡时间
  function getSingaporeDayjs(value: string | Dayjs) {
    return dayjs(
      dayjs(value)
        .add(new Date().getTimezoneOffset(), 'minute')
        .add(singaporeTimezone, 'hour')
    );
  }

  return {
    singaporeTimezone,
    singaporeDayjs: getSingaporeDayjs(dayjs()),
    getSingaporeDayjs,
  };
};
