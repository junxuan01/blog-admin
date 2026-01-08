'use client';

import { Button, Result } from 'antd';
import { Component, ReactNode } from 'react';

/**
 * 全局错误边界组件
 * 捕获组件树中的 JavaScript 错误，显示降级 UI，防止整个应用崩溃
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  /** 自定义错误回退 UI */
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // 更新 state，下次渲染时显示降级 UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 记录错误信息到控制台
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // TODO: 生产环境可以发送错误日志到监控系统（如 Sentry）
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { extra: errorInfo });
    // }

    this.setState({
      errorInfo,
    });
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // 如果提供了自定义 fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback(this.state.error as Error, this.resetError);
      }

      // 默认错误 UI
      return (
        <div className='flex h-screen items-center justify-center'>
          <Result
            status='500'
            title='Oops! Something went wrong'
            subTitle="We're sorry for the inconvenience. Please try refreshing the page."
            extra={
              <div className='flex gap-4 justify-center'>
                <Button type='primary' onClick={() => window.location.reload()}>
                  Reload Page
                </Button>
                <Button onClick={this.resetError}>Try Again</Button>
              </div>
            }
          />
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className='mt-8 max-w-2xl mx-auto p-4 bg-gray-100 rounded'>
              <summary className='cursor-pointer font-semibold text-red-600'>
                Error Details (Development Only)
              </summary>
              <pre className='mt-4 text-sm overflow-auto'>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook 版本的错误边界（实验性）
 * 注意: React 目前不支持在函数组件中捕获错误，此 hook 仅用于手动错误处理
 */
export const useErrorHandler = () => {
  const handleError = (error: Error) => {
    // 抛出错误，让最近的 ErrorBoundary 捕获
    throw error;
  };

  return handleError;
};
