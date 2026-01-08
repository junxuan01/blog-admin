import type { UserInfo } from '@api/auth/type';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * 用户状态管理 Store
 */
interface UserStore {
  /** 当前用户信息 */
  userInfo: UserInfo | null;
  /** 设置用户信息 */
  setUserInfo: (info: UserInfo | null) => void;
  /** 清除用户信息 */
  clearUserInfo: () => void;
}

/**
 * 用户状态管理 Hook
 * 管理当前登录用户的信息,支持持久化存储
 */
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      set => ({
        userInfo: null,
        // 设置用户信息
        setUserInfo: userInfo => set({ userInfo }),
        // 清除用户信息（彻底删除 localStorage key）
        clearUserInfo: () => {
          set({ userInfo: null });
          // 使用 Zustand persist 内置方法清除存储
          useUserStore.persist.clearStorage();
        },
      }),
      { name: 'user-storage' }
    ),
    {
      name: 'UserStore',
      enabled: process.env.NODE_ENV === 'development', // 仅开发环境启用
    }
  )
);
