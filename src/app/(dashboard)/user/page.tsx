'use client';

import { EyeOutlined } from '@ant-design/icons';
import BaseTable, {
  type BaseTableActionType,
  type BaseTableSearchForm,
} from '@components/base-table';
import type { BaseTableProps } from '@components/base-table/types';
import { PageWrapper } from '@components/page-wrapper';
import { Button, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRef } from 'react';
import { getUsers } from '@/base/api/user';
import type { UserListItem } from '@/base/api/user/types';

export default function UsersPage() {
  const actionRef = useRef<BaseTableActionType>(undefined);
  const formRef = useRef<BaseTableSearchForm>(undefined);
  // const { handleDataSourceChange } = useDetailNavigate('orders');

  // 表格列配置
  const columns: BaseTableProps<UserListItem>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      hideInSearch: true,
      render: (_, record) => (
        <Link
          href={`#/users/${record.id}`}
          className='text-blue-600 font-medium'
        >
          {record.username}
        </Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 240,
      hideInSearch: true,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      hideInSearch: true,
      render: (_, record) =>
        record.created_at
          ? dayjs(record.created_at).format('YYYY-MM-DD HH:mm')
          : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Tooltip title='View'>
            <Button
              icon={<EyeOutlined />}
              onClick={() => window.open(`/users/${record.id}`, '_blank')}
            />
          </Tooltip>
        </Space>
      ),
    },
    // 搜索字段
    {
      title: 'Search',
      dataIndex: 'keyword',
      hideInTable: true,
      valueType: 'text',
      fieldProps: {
        placeholder: 'Username or email',
      },
    },
  ];

  return (
    <PageWrapper title='Users'>
      <Space orientation='vertical' size='large' className='w-full'>
        <BaseTable<UserListItem>
          actionRef={actionRef}
          formRef={formRef}
          columns={columns}
          request={async ({ pageSize, current, ...rest }) => {
            const params = {
              page: current ?? 1,
              page_size: pageSize ?? 10,
              ...rest,
            };

            // 调用后端用户列表接口
            const data = await getUsers(params);

            return {
              success: true,
              total: data?.total ?? 0,
              data: data?.list ?? [],
            };
          }}
          dateFormatter={value => {
            if (!value) return '';
            return dayjs(value).format('YYYY-MM-DD');
          }}
          rowKey='id'
        />
      </Space>
    </PageWrapper>
  );
}
