import { LeftOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  PageContainer,
  type PageContainerProps,
  ProCard,
  type ProCardProps,
} from '@ant-design/pro-components';
import { Button, Space, theme } from 'antd';
import { merge } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export type PageWrapperProps = PageContainerProps;

export const PageWrapper: React.FC<
  PageWrapperProps & {
    card?: false | ProCardProps;
    showBack?: boolean;
  }
> = ({
  children,
  card = {},
  backIcon,
  onBack,
  showBack,
  footerToolBarProps,
  footer,
  ...reset
}) => {
  const pathname = usePathname();

  // 自动计算回退路径
  const backPathname = useMemo(() => {
    const purePathname = pathname.replace(/\/\d+$/g, '');
    const combine = purePathname?.split('/')?.slice(0, -1)?.join('/');
    return combine;
  }, [pathname]);

  const { token } = theme.useToken();
  const router = useRouter();

  // 智能回退函数：先尝试 router.back()，如果失败则使用计算的路径
  const routeBack = () => {
    const prev = window.location.href;
    router.back();
    setTimeout(() => {
      if (window.location.href === prev) {
        router.push(backPathname);
      }
    }, 300);
  };

  const onBackFn = onBack ?? routeBack;

  // 判断是否应该禁用返回按钮
  const disabledBack = useMemo(() => {
    if (onBack) {
      return false;
    }
    return backPathname === '/';
  }, [onBack, backPathname]);

  const showFooterToolbar = footer || footerToolBarProps;

  const footerToolBarMergeProps = merge(
    {
      style: {
        backgroundColor: '#fff',
      },
    },
    footerToolBarProps ?? {}
  );

  return (
    <PageContainer
      breadcrumbRender={(_props, defaultDom) => {
        return (
          <div>
            {showBack && (
              <div>
                {backIcon ? (
                  backIcon
                ) : (
                  <Button
                    type='link'
                    disabled={disabledBack}
                    className='px-0!'
                    onClick={onBackFn}
                    icon={<LeftOutlined />}
                  >
                    Back
                  </Button>
                )}
              </div>
            )}
            <div>{defaultDom}</div>
          </div>
        );
      }}
      tabProps={{
        type: 'line',
        style: {
          backgroundColor: '#fff',
          padding: token.padding,
          borderRadius: token.borderRadius,
        },
      }}
      {...reset}
    >
      {card ? <ProCard {...(card as any)}>{children}</ProCard> : children}
      {showFooterToolbar && (
        <FooterToolbar {...footerToolBarMergeProps}>
          {footer ? <Space>{footer}</Space> : footerToolBarMergeProps?.children}
        </FooterToolbar>
      )}
    </PageContainer>
  );
};
