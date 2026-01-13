'use client';

import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { PageWrapper } from '@components/page-wrapper';
import { useMutation } from '@tanstack/react-query';
import { App, Button, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/base/api/article';
import type { CreateArticleRequest } from '@/base/api/article/types';

export default function NewArticlePage() {
  const { message } = App.useApp();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: (data: CreateArticleRequest) => createArticle(data),
    onSuccess: () => {
      message.success('Article created successfully');
      router.push('/article');
    },
    onError: (error: any) => {
      message.error(error?.message || 'Failed to create article');
    },
  });

  const handleSubmit = async (values: CreateArticleRequest) => {
    await createMutation.mutateAsync(values);
  };

  return (
    <PageWrapper title='New Article'>
      <Card>
        <ProForm<CreateArticleRequest>
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: 'Create',
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
