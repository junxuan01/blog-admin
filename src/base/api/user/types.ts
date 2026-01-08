/**
 * Order 状态枚举
 */
export enum OrderStatus {
  PENDING_PAYMENT = 'ORDER_STATUS_PENDING_PAYMENT',
  CONFIRMED = 'ORDER_STATUS_CONFIRM',
  ACTIVE = 'ORDER_STATUS_ACTIVE',
  ENDED = 'ORDER_STATUS_ENDED',
  CANCELLED = 'ORDER_STATUS_CANCELLED',
}

/**
 * Order 列表项
 */
export interface OrderListItem {
  order_id: string;
  order_no: string;
  order_status: OrderStatus;
  start_date: string;
  end_date: string;
  service_type?: string;
  trip_completed?: string;
  payment_status?: string;
  order_source?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  car_type?: string;
  total_amount?: number;
  currency?: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Order 列表请求参数
 */
export interface GetOrdersParams {
  current: number;
  pageSize: number;
  order_status?: OrderStatus;
  search?: string;
  sort_field?: string;
  sort_order?: 'ASC' | 'DESC';
  start_date?: string;
  end_date?: string;
}

/**
 * Order 列表响应
 */
export interface OrdersResponse {
  list: OrderListItem[];
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  };
}

/**
 * Order 统计数据
 */
export interface OrderStatistics {
  total_count: number;
  status_counts: Array<{
    status: OrderStatus;
    count: number;
  }>;
}

/**
 * Order 详情
 */
export interface OrderDetail {
  order_id: string;
  order_no: string;
  order_status: OrderStatus;
  start_date: string;
  end_date: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  total_amount?: number;
  currency?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
  // 更多详情字段根据实际需求添加
}
