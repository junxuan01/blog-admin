import { GoogleMap } from '@react-google-maps/api';
import { useMapStore } from '@stores/useMapStore';
import { logger } from '@utils/logger';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './index.module.css';

interface MapViewProps {
  showDistance: boolean;
  locationList: LocationItem[];
}
export interface LocationItem {
  lat: number;
  lng: number;
}
export interface MapViewRef {
  refresh: () => void;
  reset: () => void;
}

const MapView = forwardRef<MapViewRef, MapViewProps>(
  ({ locationList, showDistance = false }, ref) => {
    logger.debug('locationList', locationList);
    const [directionsResponse, setDirectionsResponse] = useState<any>(null);
    const mapRef = React.useRef<any>(null);
    const routeAdded = useRef(false);
    const markersRef = useRef<any[]>([]);
    const [realList, setRealList] = useState<any[]>([]);
    const { mapState } = useMapStore();
    const [distance, setDistance] = useState(0);

    const mapLoaded = useMemo(() => {
      return mapState?.mapLoad ?? false;
    }, [mapState]);

    useEffect(() => {
      mapLoaded && locationList && updateRoute();
    }, [locationList, mapLoaded]);

    const updateRoute = () => {
      routeAdded.current = false;
      clearMapObjects();
      getDirections(locationList);
    };

    const clearMapObjects = useCallback(() => {
      if (mapRef.current?.directionsRenderer) {
        // 处理数组形式的渲染器
        if (Array.isArray(mapRef.current.directionsRenderer)) {
          mapRef.current.directionsRenderer.forEach((renderer: any) => {
            renderer.setMap(null);
          });
        } else {
          mapRef.current.directionsRenderer.setMap(null);
        }
        mapRef.current.directionsRenderer = null;
      }
      if (markersRef.current) {
        markersRef.current.forEach(marker => {
          marker.setMap(null);
        });
        markersRef.current = [];
      }
    }, [mapRef]);

    useEffect(() => {
      return () => {
        clearMapObjects();
      };
    }, []);

    useImperativeHandle(ref, () => ({
      refresh: () => {
        updateRoute();
      },
      reset: () => {
        clearMapObjects();
      },
    }));

    // 调整地图边界并留出间距的方法
    const adjustMapBoundsWithPadding = (
      map: any,
      realList: any,
      padding = 0.01
    ) => {
      if (!map) return;
      const bounds = new google.maps.LatLngBounds();
      // 包含起点和终点
      bounds.extend(new google.maps.LatLng(realList[0].lat, realList[0].lng));
      // 包含所有路径点
      realList.forEach((waypoint: any) => {
        bounds.extend(new google.maps.LatLng(waypoint.lat, waypoint.lng));
      });
      // 获取当前的边界
      const ne = bounds.getNorthEast(); // 获取东北角
      const sw = bounds.getSouthWest(); // 获取西南角
      // 扩展边界，增加间距
      bounds.extend(
        new google.maps.LatLng(ne.lat() + padding, ne.lng() + padding)
      );
      bounds.extend(
        new google.maps.LatLng(sw.lat() - padding, sw.lng() - padding)
      );
      // 调整地图边界
      // 延迟一点时间设置缩放，确保边界先调整好
      setTimeout(() => {
        // 调整地图边界
        map?.fitBounds(bounds);
      }, 50);
    };

    // 添加获取路线的方法
    const getDirections = useCallback(
      (locationList: any) => {
        if (!locationList || locationList.length === 0) {
          return;
        }
        const origin = locationList[0];
        const destination = locationList[locationList.length - 1];
        const waypoints =
          locationList.length > 2
            ? locationList
                .slice(1, -1)
                .map((location: any) => ({ location, stopover: true }))
            : [];
        if (!origin.lat || !destination.lat || !mapLoaded) return;
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: false,
          },
          (response, status) => {
            if (
              status === google.maps.DirectionsStatus.OK &&
              response &&
              !routeAdded.current
            ) {
              const list: any[] = [];
              let distance = 0;
              response.routes[0].legs.forEach((leg: any, index: number) => {
                if (index === 0) {
                  list.push({
                    lat: leg.start_location.lat(),
                    lng: leg.start_location.lng(),
                  });
                }
                list.push({
                  lat: leg.end_location.lat(),
                  lng: leg.end_location.lng(),
                });
                distance += leg.distance.value;
              });
              setDistance(distance);
              routeAdded.current = true;
              setRealList(list);
              setDirectionsResponse(response);
            }
          }
        );
      },
      [mapLoaded]
    );

    const setMapPin: any = useMemo(
      () => () => {
        if (!realList.length) return;
        const map = mapRef.current;
        realList.forEach((waypoint, index) => {
          const marker = new google.maps.Marker({
            position: waypoint,
            map: map,
            label: {
              text: (index + 1).toString(),
              color: '#fff',
              fontSize: '17px',
              fontWeight: 'bold',
            },
            icon: {
              url: '/pin.svg',
              scaledSize: new google.maps.Size(43, 43), // 缩放图标
              origin: new google.maps.Point(0, 0), // 图标的原点
              anchor: new google.maps.Point(16, 16), // 图标的锚点
            },
          });
          markersRef.current.push(marker);
        });
        // 调整位置显示的中心
        if (mapRef.current) {
          adjustMapBoundsWithPadding(
            mapRef.current,
            realList,
            // driverLocation,
            0.00001 // 可调整的边距比例
          );
        }
      },
      [realList]
    );

    useEffect(() => {
      if (mapLoaded) {
        setMapPin();
      }
    }, [mapLoaded, realList]);

    useEffect(() => {
      if (mapLoaded && directionsResponse) {
        const map = mapRef.current;

        // 创建边框渲染器
        const borderRenderer = new google.maps.DirectionsRenderer({
          directions: directionsResponse,
          preserveViewport: true,
          polylineOptions: {
            strokeColor: '#0b12d3',
            strokeOpacity: 1,
            strokeWeight: 8,
          },
          markerOptions: {
            visible: false,
          },
        });

        // 创建主线条渲染器
        const mainRenderer = new google.maps.DirectionsRenderer({
          directions: directionsResponse,
          preserveViewport: true,
          polylineOptions: {
            strokeColor: '#1149ff', // 蓝色主线条
            strokeOpacity: 1,
            strokeWeight: 6,
            icons: [
              {
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: '#ffffff',
                  fillOpacity: 1,
                  scale: 3,
                  strokeWeight: 1,
                  strokeColor: '#153bb3',
                },
                offset: '0%',
                repeat: '50px',
                fixedRotation: false,
              },
            ],
          },
          markerOptions: {
            visible: false,
          },
        });

        // 先渲染边框，再渲染主线条
        borderRenderer.setMap(map);
        mainRenderer.setMap(map);

        // 保存引用以便后续清除
        mapRef.current.directionsRenderer = [borderRenderer, mainRenderer];
      }
    }, [directionsResponse, mapLoaded]);

    const Content: React.ReactNode = (
      <div>
        {mapLoaded && (
          <div>
            <div
              className={styles['map-wrap']}
              style={{
                height: `calc(100% - ${distance ? 38 : 0}px)`,
              }}
            >
              <GoogleMap
                options={{
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  fullscreenControl: false,
                  mapTypeControl: false,
                  zoomControl: true,
                  streetViewControl: false, // 街景视图控件
                  zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM,
                  },
                }}
                onLoad={(map: any) => {
                  mapRef.current = map;
                }}
                mapContainerStyle={{ width: '100%', height: '100%' }}
              ></GoogleMap>
            </div>
            {showDistance && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  justifyContent: 'center',
                  marginTop: '20px',
                  height: '18px',
                }}
              >
                <span>Total Distance:</span>
                <span style={{ fontWeight: '600', fontSize: '20px' }}>
                  {distance ? `${Number((distance / 1000).toFixed(2))}km` : '-'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );

    return <div className={styles['map-view-wrap']}>{Content}</div>;
  }
);

MapView.displayName = 'MapView';

export default MapView;
