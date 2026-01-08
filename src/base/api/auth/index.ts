import authService from '@clients/auth';
// import { logger } from '@utils/logger';
import type { ILogin, LoginResponse, UserInfo } from './type';

/**
 * 用户登录
 * @param params 登录参数（email, password）
 * @returns 登录响应数据（access_token, refresh_token, business_tenant 等）
 */
export const login = async (params: ILogin) => {
  return await authService.request<LoginResponse>({
    method: 'POST',
    url: '/api/user/login',
    data: params,
    hideErrorTip: false,
  });
};

/**
 * 用户登出
 * @description 调用后端登出接口，清除服务端 session
 * @returns Promise<void>
 */
export const logout = async () => {
  await authService.request<Record<string, never>>({
    method: 'POST',
    url: '/api/user/logout',
    hideErrorTip: true, // 登出失败也继续执行本地清理
  });
};

/**
 * 获取当前登录用户信息
 * @description 获取当前登录用户的详细信息，包括用户 ID、姓名、邮箱、部门、角色等
 * @returns Promise<UserInfo> 用户信息对象
 */
export const getMe = async () => {
  return await authService.get<UserInfo>('/api/user/me');
};
