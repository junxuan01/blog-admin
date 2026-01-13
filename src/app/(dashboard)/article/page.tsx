'use client';

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import BaseTable, {
  type BaseTableActionType,
  type BaseTableSearchForm,
} from '@components/base-table';
import type { BaseTableProps } from '@components/base-table/types';
import { PageWrapper } from '@components/page-wrapper';
import { useMutation } from '@tanstack/react-query';
import { App, Button, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { deleteArticle, getArticles } from '@/base/api/article';
import type { ArticleListItem } from '@/base/api/article/types';

export default function ArticlesPage() {
  const { message, modal } = App.useApp();
  const router = useRouter();
  const actionRef = useRef<BaseTableActionType>(undefined);
  const formRef = useRef<BaseTableSearchForm>(undefined);

  // 删除文章
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteArticle(id),
    onSuccess: () => {
      message.success('Article deleted successfully');
      actionRef.current?.reload();
    },
    onError: (error: any) => {
      message.error(error?.message || 'Failed to delete article');
    },
  });

  // 确认删除
  const handleDelete = (record: ArticleListItem) => {
    modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete "${record.title}"?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { danger: true },
      onOk: () => deleteMutation.mutate(record.id),
    });
  };

  // 表格列配置
  const columns: BaseTableProps<ArticleListItem>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      hideInSearch: true,
      render: (_, record) => (
        <Link
          href={`/article/${record.id}`}
          className='text-blue-600 font-medium hover:underline'
          prefetch={true}
        >
          {record.title}
        </Link>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      hideInSearch: true,
      width: 300,
      ellipsis: true,
      render: (_dom, record) => {
        const preview =
          record.content.length > 100
            ? `${record.content.slice(0, 100)}...`
            : record.content;
        return <span className='text-gray-600'>{preview}</span>;
      },
    },
    {
      title: 'Author',
      dataIndex: ['user', 'username'],
      width: 150,
      hideInSearch: true,
      render: (_dom, record) => {
        return record.user ? (
          <span>{record.user.username}</span>
        ) : (
          <span className='text-gray-400'>Unknown</span>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: 180,
      hideInSearch: true,
      render: (_, record) =>
        record.created_at
          ? dayjs(record.created_at).format('YYYY-MM-DD HH:mm')
          : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      hideInSearch: true,
      fixed: 'right',
      render: (_, record) => (
        <Space size='small'>
          <Tooltip title='View'>
            <Link href={`/article/${record.id}`} prefetch={true}>
              <Button icon={<EyeOutlined />} size='small' />
            </Link>
          </Tooltip>
          <Tooltip title='Edit'>
            <Button
              icon={<EditOutlined />}
              size='small'
              type='primary'
              ghost
              onClick={() => router.push(`/article/${record.id}/edit`)}
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Button
              icon={<DeleteOutlined />}
              size='small'
              danger
              loading={deleteMutation.isPending}
              onClick={() => handleDelete(record)}
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
        placeholder: 'Search by title or content',
      },
    },
  ];

  return (
    <PageWrapper
      title='Articles'
      extra={
        <Link href='/article/new' prefetch={false}>
          <Button type='primary' icon={<PlusOutlined />}>
            New Article
          </Button>
        </Link>
      }
    >
      <BaseTable<ArticleListItem>
        actionRef={actionRef}
        formRef={formRef}
        columns={columns}
        request={async ({ pageSize, current, ...rest }) => {
          const params = {
            page: current ?? 1,
            page_size: pageSize ?? 10,
            ...rest,
          };

          const data = await getArticles(params);

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
    </PageWrapper>
  );
}
