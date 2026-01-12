'use client';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { register } from '@api/auth';
import type { IRegister } from '@api/auth/type';
import { useMutation } from '@tanstack/react-query';
import { App, Button, Card } from 'antd';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { message } = App.useApp();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: (values: IRegister) => register(values),
    onSuccess: () => {
      message.success('注册成功！请登录');
      router.push('/login');
    },
    onError: (error: any) => {
      message.error(error?.message || '注册失败，请重试');
    },
  });

  const handleRegister = async (
    values: IRegister & { confirmPassword?: string }
  ) => {
    const { confirmPassword, ...registerData } = values;
    await registerMutation.mutateAsync(registerData);
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card
        className='w-full max-w-md shadow-2xl'
        title={
          <div className='text-center py-4'>
            <h1 className='text-3xl font-bold text-gray-800'>Blog Admin</h1>
            <p className='text-gray-500 mt-2'>创建您的博客管理账号</p>
          </div>
        }
      >
        <ProForm
          onFinish={handleRegister}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
            render: (_, dom) => (
              <Button
                type='primary'
                htmlType='submit'
                loading={registerMutation.isPending}
                block
                className='h-12 text-lg font-medium'
                onClick={() => dom[0]}
              >
                注册
              </Button>
            ),
          }}
          layout='vertical'
          autoFocusFirstInput
        >
          <ProFormText
            name='username'
            label='用户名'
            placeholder='请输入用户名'
            fieldProps={{
              prefix: <UserOutlined className='text-gray-400' />,
              autoComplete: 'username',
              size: 'large',
            }}
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              { max: 20, message: '用户名最多20个字符' },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名只能包含字母、数字和下划线',
              },
            ]}
          />

          <ProFormText
            name='email'
            label='邮箱'
            placeholder='请输入邮箱'
            fieldProps={{
              prefix: <MailOutlined className='text-gray-400' />,
              autoComplete: 'email',
              size: 'large',
            }}
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          />

          <ProFormText.Password
            name='password'
            label='密码'
            placeholder='请输入密码'
            fieldProps={{
              prefix: <LockOutlined className='text-gray-400' />,
              autoComplete: 'new-password',
              size: 'large',
            }}
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          />

          <ProFormText.Password
            name='confirmPassword'
            label='确认密码'
            placeholder='请再次输入密码'
            fieldProps={{
              prefix: <LockOutlined className='text-gray-400' />,
              autoComplete: 'new-password',
              size: 'large',
            }}
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          />
        </ProForm>

        <div className='text-center text-gray-500 text-sm mt-4'>
          已有账号？
          <Button
            type='link'
            onClick={() => router.push('/login')}
            className='p-0 ml-1'
          >
            立即登录
          </Button>
        </div>
      </Card>
    </div>
  );
}
