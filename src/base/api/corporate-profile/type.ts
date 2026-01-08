export interface ICorporatePortalSearchParams {
  search_text: string;
  status: string;
  business_unit: string;
  payment_mode: string;
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
}

export interface CorporateProfileEntity {
  id?: string;
  corporate_name?: string;
  // Unique Entity Number (UEN)，新加坡公司的唯一实体号码
  uen?: string;
  postal_code?: string;
  registered_address?: string;
  contact_number?: string;
  country_code?: string;
  email_address?: string;
  category?: string;
  payment_mode?: string;
  business_unit?: string;
  status?: string;
  approval_flow_enabled?: boolean;
  display_price_in_portal?: boolean;
}

/**
 * 更新 Corporate 状态参数
 */
export interface IUpdateCorporateStatusParams {
  id: string;
  status: 'enabled' | 'disabled';
}

export interface IRefundRule {
  description: string;
  refund_percentage: string;
  greater_than_hours: string;
  less_than_or_equal_hours: string | null;
}

export interface ISaveRefundRulesParams {
  // corporate_id: string;
  refund_rules: IRefundRule[];
}

export type IGetRefundRulesParams = {};

/**
 * 获取 Refund Rules 响应
 */
export interface IGetRefundRulesResponse {
  refund_rules: IRefundRule[];
}

export interface ITermAndCondition {
  title: string;
  content: string;
  sequence: number;
  // 唯一标识 ID，用它来区分是新增还是编辑
  id?: string;
}

export interface IGetTermsConditionsResponse {
  term_and_conditions: ITermAndCondition[];
}
export interface IDeleteTermsConditionsParams {
  // corporate_id: string;
  term_and_condition_id: string;
}

export interface ISaveTermsConditionsParams {
  // corporate_id: string;
  title: string;
  content: string;
  sequence?: number;
  // 唯一标识 ID，用它来区分是新增还是编辑
  id?: string;
}

export type IGetTermsConditionsParams = {};

// Admin Account types
export interface IAdminAccount {
  id?: string;
  name: string;
  nric_fin: string;
  job_title: string;
  contact_number: string;
  country_code: string;
  login_email: string;
  password?: string;
}

export interface IGetAdminAccountsParams {
  // corporate_id: string;
  pagination: {
    page: number;
    page_size: number;
  };
}

export interface IGetAdminAccountsResponse {
  admin_accounts: IAdminAccount[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
}

export interface IAddAdminAccountParams {
  // corporate_id: string;
  admin_account: {
    name: string;
    nric_fin: string;
    job_title: string;
    contact_number: string;
    country_code: string;
    login_email: string;
    password?: string;
  };
}

export interface IUpdateAdminAccountParams {
  // corporate_id: string;
  admin_account: {
    id?: string;
    name: string;
    nric_fin: string;
    job_title: string;
    contact_number: string;
    country_code: string;
    login_email: string;
    password?: string;
  };
}

export interface IDeleteAdminAccountParams {
  // corporate_id: string;
  admin_account_id: string;
}

export interface IWhitelistUser {
  id: string;
  // corporate_id: string;
  name: string;
  email: string;
  phone: string;
  country_code: string;
}

export interface IGetWhitelistUsersResponse {
  whitelists: IWhitelistUser[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
}

export interface IGetWhitelistUsersParams {
  // corporate_id: string;
  pagination: {
    page: number;
    page_size: number;
  };
}

export interface IAddWhitelistUserParams {
  corporate_id: string;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  id?: string;
}

/**
 * Booking Portal 信息
 */
export interface IBookingPortalInfo {
  title: string;
  tagline: string;
  booking_portal_url: string;
  banner_url: string;
}
