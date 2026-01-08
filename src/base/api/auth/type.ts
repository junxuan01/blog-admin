export interface ILogin {
  email: string;
  password: string;
}

/**
 * 业务租户信息
 */
export interface BusinessTenant {
  business_tenant_key: string;
  business_tenant_name: string;
  id: number;
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  business_tenant: BusinessTenant;
  tenant_redirect_uri: string;
}

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户 ID */
  user_id: number;
  /** 用户名称 */
  user_name: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phone_number: string;
  /** 部门 */
  department: string;
  /** 业务单元 */
  bu: string;
  /** 职位 */
  job_title: string;
  /** 角色名称列表 */
  role_names: string[];
}
