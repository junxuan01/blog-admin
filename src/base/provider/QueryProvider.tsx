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
            // Admin 后台优化配置
            staleTime: 1000 * 60 * 3, // 3分钟：数据在3分钟内视为新鲜，减少不必要的请求
            gcTime: 1000 * 60 * 10, // 10分钟：缓存保留时间，提供更好的前进/后退体验
            retry: false, // 失败不重试（避免请求失败时无限重试）
            refetchOnWindowFocus: false, // 切回标签页时不自动刷新（Admin 后台通常不需要）
            refetchOnReconnect: false, // 网络重连时不自动刷新

            // 说明：
            // - staleTime: 3分钟 意味着数据在3分钟内认为是"新鲜的"，不会后台重新请求
            // - gcTime: 10分钟 意味着缓存保留10分钟，便于在标签页间快速切换
            // - 对于需要实时数据的查询，可在具体的 useQuery 中覆盖：{ staleTime: 0, refetchOnWindowFocus: true }
            // - 对于很少变化的数据（如字典、配置），可设置更长的 staleTime
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
      {/* 暂时禁用 DevTools 以提升性能 */}
      {/* {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )} */}
    </QueryClientProvider>
  );
};
