import { Request } from '@junxuan/requests';
import { useAuthStore } from '@stores/index';

/**
 * Blog Service
 * 用于 Blog API 请求（Go 后端）
 */
const blogService = new Request({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8080',
  returnData: true,
  timeout: 10000,
  requestInterceptor: config => {
    // 确保 headers 存在
    config.headers = config.headers ?? {};

    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
});

export default blogService;
