import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * 业务租户信息
 */
export interface BusinessTenant {
  /** 业务租户 key，用于 API 请求 header */
  business_tenant_key: string;
  /** 业务租户名称 */
  business_tenant_name: string;
  /** 业务租户 ID */
  id: number;
}

/**
 * 设置认证信息的参数
 */
export interface SetAuthInfoParams {
  /** 访问令牌 */
  token: string;
  /** 刷新令牌（可选） */
  refreshToken?: string;
  /** 业务租户信息（可选） */
  businessTenant?: BusinessTenant;
}

/**
 * 认证状态管理 Store
 * 负责管理用户的登录状态、token 和业务租户信息
 *
 * 使用方式：
 * 1. React 组件中：const { token } = useAuthStore();
 * 2. 非 React 环境（如 axios 拦截器）：useAuthStore.getState().token
 */
interface AuthStore {
  /** 用户认证 token */
  token: string | null;
  /** 刷新令牌 */
  refreshToken: string | null;
  /** 业务租户信息 */
  businessTenant: BusinessTenant | null;
  /** 是否已认证 */
  isAuthenticated: boolean;

  /** 设置完整的认证信息（token + refreshToken + businessTenant） */
  setAuthInfo: (params: SetAuthInfoParams) => void;
  /** 设置 token 并更新认证状态 */
  setToken: (token: string) => void;
  /** 清除所有认证信息并退出登录 */
  clearAuth: () => void;
}

/**
 * 认证状态管理 Hook
 * 使用 Zustand 管理全局认证状态，支持持久化和 DevTools 调试
 *
 * 数据持久化到 localStorage (key: 'auth-storage')
 * 这是 token 和认证信息的唯一数据源（Single Source of Truth）
 */
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      set => ({
        token: null,
        refreshToken: null,
        businessTenant: null,
        isAuthenticated: false,

        // 设置完整的认证信息（推荐使用）
        setAuthInfo: ({
          token,
          refreshToken,
          businessTenant,
        }: SetAuthInfoParams) => {
          set({
            token,
            refreshToken: refreshToken ?? null,
            businessTenant: businessTenant ?? null,
            isAuthenticated: true,
          });
        },

        // 仅设置 token
        setToken: (token: string) => {
          set({ token, isAuthenticated: true });
        },

        // 清除所有认证信息（彻底删除 localStorage key）
        clearAuth: () => {
          // set({
          //   token: null,
          //   refreshToken: null,
          //   businessTenant: null,
          //   isAuthenticated: false,
          // });
          // 使用 Zustand persist 内置方法清除存储
          useAuthStore.persist.clearStorage();
        },
      }),
      { name: 'auth-storage' }
    ),
    {
      name: 'AuthStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
