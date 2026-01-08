import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * 应用全局状态 Store
 */
interface AppStore {
  /** 侧边栏是否折叠 */
  collapsed: boolean;
  /** 切换侧边栏折叠状态 */
  toggleCollapsed: () => void;
  /** 设置侧边栏折叠状态 */
  setCollapsed: (collapsed: boolean) => void;
}

/**
 * 应用全局状态管理 Hook
 * 管理应用级别的 UI 状态,如侧边栏折叠等
 */
export const useAppStore = create<AppStore>()(
  devtools(
    set => ({
      collapsed: false,
      // 切换侧边栏折叠状态
      toggleCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
      // 设置侧边栏折叠状态
      setCollapsed: collapsed => set({ collapsed }),
    }),
    {
      name: 'AppStore',
      enabled: process.env.NODE_ENV === 'development', // 仅开发环境启用
    }
  )
);
