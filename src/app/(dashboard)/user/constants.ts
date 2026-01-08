import { OrderStatus } from '@api/orders/types';

/**
 * Order 状态筛选项配置
 */
export const orderStatusFilters = [
  {
    label: 'Pending Payment',
    status: OrderStatus.PENDING_PAYMENT,
  },
  {
    label: 'Confirmed',
    status: OrderStatus.CONFIRMED,
  },
  {
    label: 'In Progress',
    status: OrderStatus.ACTIVE,
  },
  {
    label: 'Completed',
    status: OrderStatus.ENDED,
  },
  {
    label: 'Cancelled',
    status: OrderStatus.CANCELLED,
  },
];
