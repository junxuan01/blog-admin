import { TENANT_KEY } from '@const/auth';
import { Request } from '@junxuan/requests';
import { useAuthStore } from '@stores/index';

/**
 * Auth Service
 * 用于 Auth 相关 API 请求
 */
const authService = new Request({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  returnData: true,
  timeout: 10000,
  requestInterceptor: config => {
    // 确保 headers 存在
    config.headers = config.headers ?? {};

    // 添加 Authorization token
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加 Tenant-Key（固定值）
    config.headers['Tenant-Key'] = TENANT_KEY;

    // 添加 Business-Tenant-Key（从 store 读取）
    const businessTenantKey =
      useAuthStore.getState().businessTenant?.business_tenant_key;
    if (businessTenantKey) {
      config.headers['Business-Tenant-Key'] = businessTenantKey;
    }

    return config;
  },
  onUnauthorized() {},
});

export default authService;
