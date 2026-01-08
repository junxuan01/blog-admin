import corporateService from '@clients/corporate';
import type {
  CorporateProfileEntity,
  IAddAdminAccountParams,
  IAddWhitelistUserParams,
  IBookingPortalInfo,
  IDeleteAdminAccountParams,
  IDeleteTermsConditionsParams,
  IGetAdminAccountsParams,
  IGetAdminAccountsResponse,
  IGetRefundRulesParams,
  IGetRefundRulesResponse,
  IGetTermsConditionsParams,
  IGetTermsConditionsResponse,
  IGetWhitelistUsersParams,
  IGetWhitelistUsersResponse,
  ISaveRefundRulesParams,
  ISaveTermsConditionsParams,
  IUpdateAdminAccountParams,
} from './type';

/**
 * ============================================
 * Corporate Portal 相关接口
 * ============================================
 */

/**
 * 创建修改 Corporate
 */
export const createCorporate = (params: CorporateProfileEntity) => {
  return corporateService.post<any>(
    '/api/corporates_admin/profile/save',
    params
  );
};

/**
 * 获取 Corporate 详情
 */
export const getCorporateProfileDetail = () => {
  return corporateService.get<CorporateProfileEntity>(
    '/api/corporates_admin/profile/detail'
  );
};

/**
 * ============================================
 * Admin Account 管理接口
 * ============================================
 */

/**
 * 获取 Admin Accounts 列表
 */
export const getAdminUsersList = (params: IGetAdminAccountsParams) => {
  return corporateService.post<IGetAdminAccountsResponse>(
    '/api/corporates_admin/profile/admin-accounts',
    params
  );
};

/**
 * 添加 Admin Account
 */
export const addAdminAccount = (params: IAddAdminAccountParams) => {
  return corporateService.post<any>(
    '/api/corporates_admin/profile/admin-accounts/save',
    params
  );
};

/**
 * 更新 Admin Account
 */
export const updateAdminAccount = (params: IUpdateAdminAccountParams) => {
  return corporateService.post<any>(
    '/api/corporates_admin/profile/admin-accounts/save',
    params
  );
};

/**
 * 删除 Admin Account
 */
export const deleteAdminAccount = (params: IDeleteAdminAccountParams) => {
  return corporateService.post<any>(
    '/corporates/admin-accounts/delete',
    params
  );
};

/**
 * ============================================
 * Whitelist User 管理接口
 * ============================================
 */

/**
 * 获取 Whitelist Users 列表
 */
export const getWhiteListUsers = (params: IGetWhitelistUsersParams) => {
  return corporateService.post<IGetWhitelistUsersResponse>(
    '/api/corporates_admin/profile/whitelist',
    params
  );
};

/**
 * 添加 Whitelist User
 */
export const addWhiteListUser = (params: IAddWhitelistUserParams) => {
  return corporateService.post<any>(
    '/api/corporates_admin/profile/whitelist/save',
    params
  );
};

/**
 * 删除 Whitelist User
 */
export const deleteWhiteListUser = (params: {
  corporate_id: string;
  id: string;
}) => {
  return corporateService.post<any>(
    '/api/corporates_admin/profile/whitelist/delete',
    params
  );
};

/**
 * 导入 Whitelist Users
 */
export const importWhiteListUser = (params: {
  corporate_id: string;
  object_name: string;
  path: string;
}) => {
  return corporateService.post<any>(
    '/api/corporates_admin/profile/whitelist/import',
    params
  );
};

/**
 * ============================================
 * Policies 相关接口
 * ============================================
 */

/**
 * 获取 Refund Rules
 */
export const getRefundRules = (params: IGetRefundRulesParams) => {
  return corporateService.get<IGetRefundRulesResponse>(
    '/corporates/cancellation-refund-rules',
    params
  );
};

/**
 * 保存 Refund Rules
 */
export const saveRefundRules = (params: ISaveRefundRulesParams) => {
  return corporateService.post<any>(
    '/corporates/cancellation-refund-rules/save',
    params
  );
};

/**
 * 获取 Terms and Conditions
 */
export const getTermsConditions = (params: IGetTermsConditionsParams) => {
  return corporateService.get<IGetTermsConditionsResponse>(
    '/corporates/term-and-conditions',
    params
  );
};

/**
 * 保存 Terms and Conditions
 */
export const saveTermsConditions = (params: ISaveTermsConditionsParams) => {
  return corporateService.post<any>(
    '/corporates/term-and-conditions/save',
    params
  );
};

/**
 * 删除 Terms and Conditions
 */
export const deleteTermsConditions = (params: IDeleteTermsConditionsParams) => {
  return corporateService.post<any>(
    '/corporates/term-and-conditions/delete',
    params
  );
};

/**
 * ============================================
 * Booking Portal 相关接口
 * ============================================
 */
export const getBookingPortalInfo = () => {
  return corporateService.get<IBookingPortalInfo>(
    '/api/corporates_admin/profile/portal-information'
  );
};
