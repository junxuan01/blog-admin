import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // 开启严格模式，帮助发现潜在问题
  reactCompiler: true,

  // 性能优化：预加载配置（默认已启用，这里显式配置便于理解）
  experimental: {
    // 优化包导入，减少客户端 bundle 大小
    optimizePackageImports: [
      'antd',
      '@ant-design/pro-components',
      '@ant-design/icons',
    ],
  },
};

export default nextConfig;
