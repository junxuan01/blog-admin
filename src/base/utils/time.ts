import dayjs from 'dayjs';

export const dateTimeTpl = 'DD MMM YYYY, HH:mm';

export const dateTpl = 'DD MMM YYYY';

export const formatDateTime = (date: dayjs.ConfigType) => {
  return date ? dayjs(date).format(dateTimeTpl) : '-';
};

export const formatDate = (date: dayjs.ConfigType) => {
  return date ? dayjs(date).format(dateTpl) : '-';
};
