import { get } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useSessionStorage } from './useSessionStorage';

export const useDetailNavigate = (
  key: string,
  options?: {
    id?: string;
    dataIndex?: string | string[];
  }
) => {
  const { id, dataIndex = 'id' } = options ?? {};
  const pathname = usePathname();

  const purePathname = useMemo(() => {
    return pathname.split('/').slice(0, -1).join('/');
  }, [pathname]);

  const router = useRouter();

  const [storageState, handleDataSourceChange] = useSessionStorage<any[]>(
    `useDetailNavigate:${key}`
  );

  const ids = useMemo(() => {
    return storageState?.map(item => get(item, dataIndex)) ?? [];
  }, [storageState, dataIndex]);

  const prevProps = useMemo(() => {
    const index = ids.indexOf(id);
    if (!id || !ids.length || index < 1) {
      return {
        disabled: true,
      };
    }
    return {
      onClick: () => {
        router.push(`${purePathname}/${ids[index - 1]}`);
      },
    };
  }, [ids, id, purePathname, router]);

  const nextProps = useMemo(() => {
    const index = ids.indexOf(id);
    if (!id || !ids.length || index === ids.length - 1) {
      return {
        disabled: true,
      };
    }
    return {
      onClick: () => {
        router.push(`${purePathname}/${ids[index + 1]}`);
      },
    };
  }, [ids, id, purePathname, router]);

  return {
    handleDataSourceChange,
    prevProps,
    nextProps,
  };
};
