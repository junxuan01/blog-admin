import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * 地图状态管理 Store
 */
interface MapState {
  /** 地图实例状态 */
  mapState: any;
  /** 设置地图状态 */
  setMapState: (state: any) => void;
}

/**
 * 地图状态管理 Hook
 * 管理 Google Maps 相关的状态
 */
export const useMapStore = create<MapState>()(
  devtools(
    set => ({
      mapState: null,
      // 设置地图状态
      setMapState: mapState => set({ mapState }),
    }),
    {
      name: 'MapStore',
      enabled: process.env.NODE_ENV === 'development', // 仅开发环境启用
    }
  )
);
