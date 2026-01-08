import { getCosToken } from '@api/config/cos';
import COS from 'cos-js-sdk-v5';

/**
 * 腾讯云 COS 实例
 * 使用临时凭证进行身份验证
 */
export const cos = new COS({
  getAuthorization: async (options, callback) => {
    const cos_path = options.Key.split('/')[0];
    try {
      const data = await getCosToken({ cos_path, bucket_type: 'private' });
      callback({
        TmpSecretId: data.secret_id ?? '',
        TmpSecretKey: data.secret_key ?? '',
        SecurityToken: data.token ?? '',
        StartTime: data.start_time ?? Date.now(),
        ExpiredTime: data.expired_time ?? Date.now(),
        ScopeLimit: false,
      });
    } catch (error) {
      console.error('Failed to get COS token:', error);
      callback({
        TmpSecretId: '',
        TmpSecretKey: '',
        SecurityToken: '',
        StartTime: Date.now(),
        ExpiredTime: Date.now(),
        ScopeLimit: false,
      });
    }
  },
});
