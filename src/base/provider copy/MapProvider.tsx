// import { MAP_KEY } from "./constant";

import { useMapStore } from '@stores/useMapStore';
import { logger } from '@utils/logger';
import { ReactNode, useEffect, useState } from 'react';

const AsyncMapLoader = ({
  children,
  libraries,
  googleMapsApiKey,
  onLoad,
  onError,
}: any) => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    if (isLoad) return;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&language=en&libraries=${libraries.join(
      ','
    )}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      onLoad();
      setIsLoad(true);
    };
    script.onerror = onError;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [libraries, googleMapsApiKey, onLoad, onError, isLoad]);

  return <>{children}</>;
};

function MapApp({ children }: { children: ReactNode }) {
  const MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
  const { setMapState } = useMapStore();
  const Libr: any = ['places', 'marker'];
  const onErrorCallBack = (err: any) => {
    logger.error('map load error', err);
  };
  return (
    <AsyncMapLoader
      libraries={Libr}
      googleMapsApiKey={MAP_KEY}
      onLoad={() => setMapState({ mapLoad: true })}
      onError={onErrorCallBack}
    >
      {children}
    </AsyncMapLoader>
  );
}

export default MapApp;
