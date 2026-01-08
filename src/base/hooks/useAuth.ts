import { logout as logoutApi } from '@api/auth';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useCallback } from 'react';
import { useAuthStore, useUserStore } from '../stores';

export const login = () => {
  window.location.href = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/templates/login${qs.stringify(
    {
      redirect_uri: `${window.location.origin}/admin/authVerify${window.location.search}`,
    },
    { addQueryPrefix: true }
  )}`;
};

export const useAuth = () => {
  const router = useRouter();
  const { token, setToken, clearAuth } = useAuthStore();
  const { clearUserInfo } = useUserStore();

  const handleLogin = useCallback(
    (token: string) => {
      setToken(token);
    },
    [setToken]
  );

  const logout = useCallback(async () => {
    try {
      // 调用后端登出接口
      await logoutApi();
    } catch (error) {
      // 即使登出 API 失败，也继续清除本地状态
      console.error('Logout API failed:', error);
    } finally {
      // 清除所有认证信息（token + refreshToken + businessTenant）
      clearAuth();
      // 清除用户信息
      clearUserInfo();
      // 跳转到登录页
      router.push(
        `/login${qs.stringify(
          { callback: window.location.href },
          { addQueryPrefix: true }
        )}`
      );
    }
  }, [clearAuth, clearUserInfo, router]);

  return {
    token,
    isAuthenticated: !!token,
    login: handleLogin,
    logout,
  };
};
