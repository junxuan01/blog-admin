'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '@api/auth';
import { useAuthStore } from '@stores/index';
import { App, Button, Card, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const router = useRouter();
  const setToken = useAuthStore(state => state.setToken);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await login(values);
      setToken(response.token);
      message.success('登录成功！');
      router.push('/user');
    } catch (error: any) {
      message.error(error?.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Card
        className='w-full max-w-md shadow-2xl'
        title={
          <div className='text-center py-4'>
            <h1 className='text-3xl font-bold text-gray-800'>Blog Admin</h1>
            <p className='text-gray-500 mt-2'>欢迎登录博客管理系统</p>
          </div>
        }
      >
        <Form
          form={form}
          name='login'
          onFinish={handleLogin}
          autoComplete='off'
          size='large'
          layout='vertical'
        >
          <Form.Item
            name='username'
            label='用户名'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined className='text-gray-400' />}
              placeholder='请输入用户名'
              autoComplete='username'
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='密码'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='text-gray-400' />}
              placeholder='请输入密码'
              autoComplete='current-password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              block
              className='h-12 text-lg font-medium'
            >
              登录
            </Button>
          </Form.Item>

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
        </Form>
      </Card>
    </div>
  );
}
