'use client';
import { getMe } from '@api/auth';
import type { UserInfo } from '@api/auth/type';
import { useUserStore } from '@stores/index';
import { useQuery } from '@tanstack/react-query';

export interface UseGetMeReturn {
  /** 用户信息 */
  userInfo?: UserInfo;
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error?: Error;
  /** 刷新用户信息 */
  refresh: () => void;
}

/**
 * 获取当前登录用户信息 Hook
 * @description 使用 TanStack Query 管理用户信息的获取、缓存和同步
 * @returns 返回用户信息相关状态和方法
 */
export const useGetMe = (): UseGetMeReturn => {
  const { setUserInfo } = useUserStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userInfo', 'me'],
    queryFn: async () => {
      const userInfo = await getMe();
      // 同步到 Zustand store
      setUserInfo(userInfo);
      return userInfo;
    },
    staleTime: 0, // 1分钟
    retry: false, // 请求失败不重试，避免无限重试
    refetchOnWindowFocus: true, // 切换窗口不重新请求
  });

  return {
    userInfo: data,
    loading: isLoading,
    error: error as Error | undefined,
    refresh: refetch,
  };
};
