import { useQuery } from '@tanstack/react-query';

export const fetchAccess = () => {
  return Promise.resolve({
    data: {
      list: [],
    },
  });
};

export const useAccess = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['access'],
    queryFn: fetchAccess,
    staleTime: 1000 * 60,
  });
  const access = data?.data?.list || [];

  return { access, loading: isLoading };
};
