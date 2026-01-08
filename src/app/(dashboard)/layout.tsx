'use client';
// import { useDictionary } from '@hooks/useDictionary';
import { Skeleton } from 'antd';
import { Suspense } from 'react';
import MainLayout from '@/app/layouts/main';

// 统一的加载骨架屏
const PageLoadingSkeleton = () => (
  <div className='p-6'>
    <Skeleton active paragraph={{ rows: 8 }} avatar={false} />
  </div>
);

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <div className='font-roboto'>
        {/* 在 layout 层统一包裹 Suspense，所有子页面自动获得加载状态 */}
        <Suspense fallback={<PageLoadingSkeleton />}>{children}</Suspense>
      </div>
    </MainLayout>
  );
};

export default DashBoardLayout;
