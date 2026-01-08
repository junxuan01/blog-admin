import dayjs from 'dayjs';
import { logger } from './logger';

/**
 * 格式化日期为 "01 Nov 2024" 格式
 * @param date - 日期字符串或日期对象
 * @returns 格式化后的日期字符串
 */
export const formatDisplayDate = (
  date: string | Date | null | undefined
): string => {
  if (!date) return 'N/A';

  try {
    return dayjs(date).format('DD MMM YYYY');
  } catch (error) {
    logger.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

/**
 * 格式化时间为 "HH:mm" 格式
 * @param date - 日期字符串或日期对象
 * @returns 格式化后的时间字符串
 */
export const formatDisplayTime = (
  date: string | Date | null | undefined
): string => {
  if (!date) return 'N/A';

  try {
    return dayjs(date).format('HH:mm');
  } catch (error) {
    logger.error('Time formatting error:', error);
    return 'Invalid Time';
  }
};

/**
 * 格式化货币显示为 "S$ 3.22" 格式
 * @param amount - 金额字符串或数字
 * @param currency - 货币符号，默认为 "S$"
 * @returns 格式化后的货币字符串
 */
export const formatCurrency = (
  amount: string | number | null | undefined,
  currency: string = 'S$'
): string => {
  if (!amount && amount !== 0) return '-';

  try {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (Number.isNaN(numAmount)) return '-';

    // 格式化为两位小数
    const formattedAmount = numAmount.toFixed(2);

    return `${currency} ${formattedAmount}`;
  } catch (error) {
    logger.error('Currency formatting error:', error);
    return '-';
  }
};

/**
 * 格式化日期时间为 "01 Nov 2024, 14:30" 格式
 * @param date - 日期字符串或日期对象
 * @returns 格式化后的日期时间字符串
 */
export const formatDisplayDateTime = (
  date: string | Date | null | undefined
): string => {
  if (!date) return 'N/A';

  try {
    return dayjs(date).format('DD MMM YYYY, HH:mm');
  } catch (error) {
    logger.error('DateTime formatting error:', error);
    return 'Invalid DateTime';
  }
};

export const scrollToRegisterForm = () => {
  const target = document.getElementById('enterprise-register-form');
  console.log(target, 'target');
  if (!target) return;
  const headerEl = document.querySelector(
    '.layout-header-container__header'
  ) as HTMLElement | null;
  const headerH = headerEl?.offsetHeight ?? 0;
  // 目标元素相对页面的绝对位置
  const absoluteTop = target.getBoundingClientRect().top + window.scrollY;

  // 预留 12px 缝隙，避免紧贴头部
  const y = Math.max(0, absoluteTop - headerH - 12);
  console.log(y, 'y', target.getBoundingClientRect().top, headerH);
  window.scrollTo({ top: y, behavior: 'smooth' });
};
