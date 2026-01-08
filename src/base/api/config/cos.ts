import corporateService from '@clients/corporate';

/**
 * COS Token 响应类型
 * 匹配后端 get-cos-token-v2 接口返回格式
 */
export interface CosTokenResponse {
  /** 临时密钥 SecretId */
  secret_id: string;
  /** 临时密钥 SecretKey */
  secret_key: string;
  /** 临时安全令牌 */
  token: string;
  /** 凭证生效时间戳（秒） */
  start_time: number;
  /** 凭证过期时间戳（秒） */
  expired_time: number;
  /** COS 存储桶名称，如 booking-uat-1328389076 */
  bucket_name: string;
  /** COS 区域，如 ap-singapore */
  region: string;
  /** COS 访问域名 */
  endpoint: string;
  /** 上传路径前缀 */
  path: string;
  /** 请求 ID */
  request_id: string;
}

/**
 * 获取 COS 临时凭证
 */
export const getCosToken = (params: {
  cos_path: string;
  bucket_type?: 'private' | 'public';
}) => {
  return corporateService.post<CosTokenResponse>(
    '/api/corporates_admin/configuration/get-cos-token-v2',
    params
  );
};
