'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ProConfigProvider } from '@ant-design/pro-components';
import { ErrorBoundary } from '@components/ErrorBoundary';
import valueTypeMap from '@components/pro-components';
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react';
import { useDayjsConfig } from '@hooks/useDayjsConfig';
import { App, ConfigProvider, ThemeConfig } from 'antd';
import enUS from 'antd/locale/en_US';
import MapProvider from './MapProvider';
import { QueryProvider } from './QueryProvider';

/**
 * Ant Design 主题配置
 */
export const antdTheme: ThemeConfig = {
  token: {
    // colorPrimary: "#007066",
    controlItemBgHover: '#E6F4FF',
    controlItemBgActive: '#E6F4FF',
    colorTextDisabled: 'rgba(0,0,0,0.45)',
    fontFamily: `var(--font-roboto), roboto, sans-serif`,
  },
  components: {
    Menu: {
      itemHoverBg: '#E6F4FF',
      itemSelectedBg: '#E6F4FF',
    },
    Card: {
      bodyPadding: 16, // Card 的主体内容内边距
      borderRadiusLG: 8, // 圆角
      boxShadowTertiary: 'none', // 去掉阴影
      colorBorderSecondary: 'transparent', // 去掉边框
    },
    Button: {
      fontWeight: 600, // 按钮文案字体粗细
    },
  },
};

/**
 * 统一的应用 Provider
 * 包含所有应用级别的 Provider 配置
 *
 * Provider 嵌套顺序：
 * AntdRegistry → ConfigProvider → App → QueryProvider → ProConfigProvider → NiceModalProvider → MapProvider?
 */
interface AppProviderProps {
  children: React.ReactNode;
  /** 自定义主题，默认使用 antdTheme */
  theme?: ThemeConfig;
  /** 是否启用地图加载，默认 false */
  enableMap?: boolean;
}

const AppProvider = ({
  children,
  theme = antdTheme,
  enableMap = false,
}: AppProviderProps) => {
  // 配置 dayjs
  useDayjsConfig();

  return (
    <AntdRegistry>
      <ConfigProvider locale={enUS} theme={theme}>
        <App>
          <QueryProvider>
            <ProConfigProvider valueTypeMap={valueTypeMap}>
              <NiceModalProvider>
                <ErrorBoundary>
                  {enableMap ? <MapProvider>{children}</MapProvider> : children}
                </ErrorBoundary>
              </NiceModalProvider>
            </ProConfigProvider>
          </QueryProvider>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AppProvider;

/**
 * 带地图的 AppProvider
 * 用于需要 Google Maps 功能的页面布局
 */
export const AppProviderWithMap = ({
  children,
  theme = antdTheme,
}: Omit<AppProviderProps, 'enableMap'>) => {
  return (
    <AppProvider theme={theme} enableMap>
      {children}
    </AppProvider>
  );
};
