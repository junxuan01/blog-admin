'use client';

import { redirect } from 'next/navigation';

/**
 * 根路径页面 - 重定向到 /orders
 */
export default function RootPage() {
  redirect('/user');
}
