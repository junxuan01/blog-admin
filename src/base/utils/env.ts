/**
 * 环境变量获取工具
 */
export const getEnv = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV as string,
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
    NEXT_PUBLIC_COS_BUCKET: process.env.NEXT_PUBLIC_COS_BUCKET as string,
    NEXT_PUBLIC_COS_REGION: process.env.NEXT_PUBLIC_COS_REGION as string,
    NEXT_PUBLIC_SSO_API_URL: process.env.NEXT_PUBLIC_SSO_API_URL as string,
    NEXT_PUBLIC_MAP_KEY: process.env.NEXT_PUBLIC_MAP_KEY as string,
  };
};
