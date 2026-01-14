'use client';

import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { PageWrapper } from '@components/page-wrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { App, Button, Card, Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { getArticle, updateArticle } from '@/base/api/article';
import type { UpdateArticleRequest } from '@/base/api/article/types';

export default function EditArticlePage() {
  const { message } = App.useApp();
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);

  // 获取文章详情
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId),
    enabled: !!articleId,
  });

  // 更新文章
  const updateMutation = useMutation({
    mutationFn: (data: UpdateArticleRequest) => updateArticle(articleId, data),
    onSuccess: () => {
      message.success('Article updated successfully');
      router.push('/article');
    },
    onError: (error: any) => {
      message.error(error?.message || 'Failed to update article');
    },
  });

  const handleSubmit = async (values: UpdateArticleRequest) => {
    await updateMutation.mutateAsync(values);
  };

  if (isLoading) {
    return (
      <PageWrapper title='Edit Article'>
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
      <PageWrapper title='Edit Article'>
        <Card>
          <div className='text-center text-gray-500'>Article not found</div>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title='Edit Article'>
      <Card>
        <ProForm<UpdateArticleRequest>
          initialValues={{
            title: article.title,
            content: article.content,
          }}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: 'Update',
              resetText: 'Reset',
            },
            render: (_, dom) => (
              <div className='flex gap-2'>
                {dom}
                <Button onClick={() => router.back()}>Cancel</Button>
              </div>
            ),
          }}
        >
          <ProFormText
            name='title'
            label='Title'
            placeholder='Enter article title'
            rules={[
              { required: true, message: 'Please enter title' },
              { max: 255, message: 'Title cannot exceed 255 characters' },
            ]}
          />
          <ProFormTextArea
            name='content'
            label='Content'
            placeholder='Enter article content'
            fieldProps={{
              rows: 10,
            }}
            rules={[{ required: true, message: 'Please enter content' }]}
          />
        </ProForm>
      </Card>
    </PageWrapper>
  );
}
