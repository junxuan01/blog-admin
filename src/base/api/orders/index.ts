import corporateService from '@clients/corporate';
import type { PaginatedData } from '@utils/request/types';
import type {
  GetOrdersParams,
  OrderDetail,
  OrderListItem,
  OrderStatistics,
} from './types';

/**
 * 获取 Order 列表
 * @returns 直接返回分页数据（已解包 data）
 */
export const getOrders = async (params: GetOrdersParams) => {
  return corporateService.request<PaginatedData<OrderListItem>>({
    method: 'POST',
    url: '/api/corporates_admin/orders/list',
    data: params,
  });
};

/**
 * 获取 Order 统计数据
 */
export const getOrderStatistics = async () => {
  return corporateService.request<OrderStatistics>({
    method: 'GET',
    url: '/api/corporates_admin/orders/status-statistics',
  });
};

/**
 * 获取 Order 详情
 */
export const getOrderDetail = async (orderId: string) => {
  return corporateService.request<OrderDetail | null>({
    method: 'GET',
    url: '/api/corporates_admin/orders/detail',
    params: { order_id: orderId },
  });
};

/**
 * 取消订单
 */
export const cancelOrder = async (orderId: string, cancelReason: string) => {
  return corporateService.request({
    method: 'POST',
    url: '/api/corporates_admin/orders/cancel',
    data: {
      order_id: orderId,
      cancel_reason: cancelReason,
    },
  });
};

/**
 * 重发确认邮件
 */
export const resendConfirmation = async (orderId: string) => {
  return corporateService.request({
    method: 'POST',
    url: 'ridehailing/order/send-booking-confirmation-email',
    data: { order_id: orderId },
  });
};

/**
 * 获取订单变更历史
 */
export interface ChangeHistoryItem {
  id: string;
  order_id: string;
  operation_time: string;
  operator_name: string;
  operation_type: string;
  operation_details: string;
}

export const getOrderChangeHistory = async (orderId: string) => {
  return corporateService.request<{ histories: ChangeHistoryItem[] }>({
    method: 'GET',
    url: '/api/corporates_admin/orders/change-history',
    params: { order_id: orderId },
  });
};

/**
 * 导出 Orders
 */
export const exportOrders = async (params: Partial<GetOrdersParams>) => {
  return corporateService.request<Blob>({
    method: 'POST',
    url: '/api/corporates_admin/orders/export',
    data: params,
    responseType: 'blob',
    skipBusinessCheck: true, // 文件下载不检查业务码
  });
};

/**
 * 更新客户信息
 */
export const updateCustomerInfo = async (params: {
  order_id: string;
  name?: string;
  mobile?: string;
  email?: string;
}) => {
  return corporateService.request({
    method: 'POST',
    url: '/api/corporates_admin/orders/update-customer-info',
    data: params,
  });
};

/**
 * 获取 Terms & Conditions
 */
export const getTermsAndConditions = async (projectId: string) => {
  return corporateService.request<{
    header?: {
      title: string;
      terms: string[];
    };
    sla?: {
      title: string;
      terms: {
        id: string;
        index: number;
        title: string;
        terms: string[];
      }[];
    };
  }>({
    method: 'GET',
    url: 'quotation/getterms',
    params: { id: projectId },
  });
};
/**
 * 获取quotation contract 详情
 */
export const getQuotationDetail = async (order_id: string) => {
  return corporateService.request<any>({
    method: 'GET',
    url: '/api/corporates_admin/orders/quotation',
    params: { order_id: order_id },
  });
};

/**
 * Service Type 配置项
 */
export interface ServiceTypeConfig {
  label: string;
  value: string;
}

/**
 * 获取service type下拉数据
 */
export const getServiceTypeOptions = async () => {
  return corporateService.request<{
    service_type_configs: ServiceTypeConfig[];
  }>({
    method: 'GET',
    url: '/api/corporates_admin/orders/service-type-configs',
  });
};

export const createInquiry = async (params: any) => {
  return corporateService.request({
    method: 'POST',
    url: '/api/corporates_admin/inquiry/create',
    data: params,
  });
};
