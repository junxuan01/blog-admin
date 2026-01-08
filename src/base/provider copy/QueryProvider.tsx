'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 默认配置：适合大多数业务数据
            staleTime: 0, // ✅ 数据立即过期，确保总是获取最新数据
            gcTime: 1000 * 60 * 5, // 5分钟：缓存保留时间，用于快速返回
            retry: 1, // 失败重试1次
            refetchOnWindowFocus: false, // 切回标签页时不自动刷新（改为按需刷新或在单个查询中覆盖）
            refetchOnReconnect: true, // ✅ 网络重连时刷新

            // 说明：
            // - staleTime: 0 意味着数据"立即过期"，每次使用时都会后台重新请求
            // - gcTime: 5分钟 意味着即使过期，缓存仍保留5分钟，用于瞬间切换页面时显示旧数据（避免白屏）
            // - 如需某些查询在切回页面时刷新，可在具体的 useQuery 中传入 { refetchOnWindowFocus: true }
          },
          mutations: {
            retry: 0, // mutation 不重试，失败立即报错
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
