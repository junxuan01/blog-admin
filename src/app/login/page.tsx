'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { login } from '@api/auth';
import type { ILogin } from '@api/auth/type';
import { useAuthStore } from '@stores/index';
import { useMutation } from '@tanstack/react-query';
import { App, Button, Card } from 'antd';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const setToken = useAuthStore(state => state.setToken);

  const loginMutation = useMutation({
    mutationFn: (values: ILogin) => login(values),
    onSuccess: response => {
      setToken(response.token);
      message.success('登录成功！');
      router.push('/user');
    },
    onError: (error: any) => {
      message.error(error?.message || '登录失败，请检查用户名和密码');
    },
  });

  const handleLogin = async (values: ILogin) => {
    await loginMutation.mutateAsync(values);
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card
        className='w-full max-w-md shadow-2xl'
        title={
          <div className='text-center py-4'>
            <h1 className='text-3xl font-bold text-gray-800'>Blog Admin</h1>
            <p className='text-gray-500 mt-2'>欢迎登录博客管理系统</p>
          </div>
        }
      >
        <ProForm
          onFinish={handleLogin}
          submitter={{
            searchConfig: {
              submitText: '登录',
            },
            render: (_, dom) => (
              <Button
                type='primary'
                htmlType='submit'
                loading={loginMutation.isPending}
                block
                className='h-12 text-lg font-medium'
                onClick={() => dom[0]}
              >
                登录
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
            rules={[{ required: true, message: '请输入用户名' }]}
          />

          <ProFormText.Password
            name='password'
            label='密码'
            placeholder='请输入密码'
            fieldProps={{
              prefix: <LockOutlined className='text-gray-400' />,
              autoComplete: 'current-password',
              size: 'large',
            }}
            rules={[{ required: true, message: '请输入密码' }]}
          />
        </ProForm>

        <div className='text-center text-gray-500 text-sm mt-4'>
          还没有账号？
          <Button
            type='link'
            onClick={() => router.push('/register')}
            className='p-0 ml-1'
          >
            立即注册
          </Button>
        </div>
      </Card>
    </div>
  );
}
