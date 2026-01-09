import blogService from '@clients/blog';
import type { ILogin, IRegister, LoginResponse, UserInfo } from './type';

/**
 * 用户登录
 * @param params 登录参数（username, password）
 * @returns 登录响应数据（token, user）
 */
export const login = async (params: ILogin) => {
  return blogService.request<LoginResponse>({
    method: 'POST',
    url: '/api/v1/auth/login',
    data: params,
  });
};

/**
 * 用户注册
 * @param params 注册参数（username, password, email）
 * @returns Promise<void>
 */
export const register = async (params: IRegister) => {
  return blogService.request<void>({
    method: 'POST',
    url: '/api/v1/auth/register',
    data: params,
  });
};

/**
 * 获取当前登录用户信息
 * @returns 当前用户信息
 */
export const getMe = async () => {
  return blogService.request<UserInfo>({
    method: 'GET',
    url: '/api/v1/auth/me',
  });
};


