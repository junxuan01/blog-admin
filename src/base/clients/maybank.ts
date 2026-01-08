import { useAuthStore } from '@stores/index';
import { Request } from '@utils/request/index';

/**
 * Maybank Service
 * 用于 Maybank 相关 API 请求
 */
const mayBankService = new Request({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  returnData: true,
  timeout: 10000,
  requestInterceptor: config => {
    // 确保 headers 存在
    config.headers = config.headers ?? {};

    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['X-Partner'] = 'maybank';
    return config;
  },
});

export default mayBankService;
