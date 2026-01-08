'use client';
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import {
  CorporateProfileMenuIcon,
  Logo,
  OrdersMenuIcon,
  RequestsIcon,
  TripsIcon,
} from '@assets/icons';
import AvatarImage from '@assets/images/avatar.png';
import { useAuth } from '@hooks/useAuth';
import { useDictionary } from '@hooks/useDictionary';
import { useGetMe } from '@hooks/useProfile';
import { useAuthStore } from '@stores/index';
import { Dropdown, Spin, theme } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const menuItems: MenuDataItem[] = [
  {
    path: '/dashboard',

    icon: <DashboardOutlined />,
    name: 'Dashboard',
    hideInMenu: true,
  },

  {
    path: '/trips',
    name: 'Trips',
    icon: <TripsIcon />,
    hideInMenu: true,
  },
  {
    path: '/user',
    name: 'User',
    icon: <UserOutlined />,
  },
  {
    path: '/corporate-profile',
    name: 'Corporate Profile',
    icon: <CorporateProfileMenuIcon />,
    hideInMenu: true,
  },
];

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { userInfo, loading: profileLoading } = useGetMe();
  // 初始化字典数据
  // const { loading: dictionaryLoading } = useDictionary();
  const { logout } = useAuth();
  const { businessTenant } = useAuthStore();
  const { token } = theme.useToken();

  // 使用 profileLoading 来避免 hydration 不匹配
  if (
    profileLoading
    // || dictionaryLoading
  ) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <ProLayout
      contentStyle={{
        padding: 0,
      }}
      siderWidth={200}
      token={{
        bgLayout: '#F3F4F5',
        pageContainer: {
          // paddingInlinePageContainerContent: 10,
          // paddingBlockPageContainerContent: 10,
          // paddingBlockPageContainerContent: 20,
        },
        header: {
          heightLayoutHeader: 50,
          colorBgHeader: '#0062FF',
        },
        sider: {
          colorTextMenuSelected: token.colorPrimary,
          colorMenuBackground: '#fff',
        },
      }}
      menuProps={{
        style: {
          fontWeight: 'bold', // 设置菜单字体为粗体
        },
      }}
      title={businessTenant?.business_tenant_name}
      headerTitleRender={(logo, _, { title }) => (
        <>
          {logo}
          <div className='mx-4 h-6 w-0.5 bg-white' />
          <div className='text-xl font-bold text-amber-50'>{title}</div>
        </>
      )}
      headerRender={(_props, defaultDom) => {
        return <div className='shadow'>{defaultDom}</div>;
      }}
      logo={<Logo />}
      layout='mix'
      route={{
        path: '/',
        routes: menuItems,
      }}
      location={{
        pathname,
      }}
      menuItemRender={(props, defaultDom) => {
        return <Link href={props.path as any}>{defaultDom}</Link>;
      }}
      breadcrumbRender={false}
      avatarProps={{
        title: <span className='text-white'>{userInfo?.user_name}</span>,
        icon: <Image src={AvatarImage} alt='Avatar' width={24} height={24} />,
        style: { backgroundColor: '#87d068' },
        render: (_props, dom) => {
          return (
            <Spin spinning={profileLoading}>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: 'Log out',
                      onClick: () => logout(),
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            </Spin>
          );
        },
      }}
    >
      {children}
    </ProLayout>
  );
}
