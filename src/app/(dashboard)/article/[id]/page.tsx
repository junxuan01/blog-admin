'use client';

import { EditOutlined } from '@ant-design/icons';
import { PageWrapper } from '@components/page-wrapper';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Descriptions, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { getArticle } from '@/base/api/article';

const { Paragraph, Title } = Typography;

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);

  // 获取文章详情
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId),
    enabled: !!articleId,
  });

  if (isLoading) {
    return (
      <PageWrapper title='Article Detail'>
        <Card>
          <div className='flex justify-center items-center h-64'>
            <Spin size='large' />
          </div>
        </Card>
      </PageWrapper>
    );
  }

  if (!article) {
    return (
      <PageWrapper title='Article Detail'>
        <Card>
          <div className='text-center text-gray-500'>Article not found</div>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title='Article Detail'
      extra={
        <Button
          type='primary'
          icon={<EditOutlined />}
          onClick={() => router.push(`/article/${articleId}/edit`)}
        >
          Edit
        </Button>
      }
    >
      <Card>
        <Title level={2}>{article.title}</Title>

        <Descriptions column={2} className='mb-6'>
          <Descriptions.Item label='Author'>
            {article.user?.username || 'Unknown'}
          </Descriptions.Item>
          <Descriptions.Item label='Created At'>
            {article.created_at
              ? dayjs(article.created_at).format('YYYY-MM-DD HH:mm:ss')
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label='Updated At'>
            {article.updated_at
              ? dayjs(article.updated_at).format('YYYY-MM-DD HH:mm:ss')
              : '-'}
          </Descriptions.Item>
        </Descriptions>

        <div className='mt-6'>
          <Title level={4}>Content</Title>
          <Card type='inner' className='bg-gray-50'>
            <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
              {article.content}
            </Paragraph>
          </Card>
        </div>
      </Card>
    </PageWrapper>
  );
}
