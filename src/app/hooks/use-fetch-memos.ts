import { useEffect } from 'react';

import { useFetchMemosApi } from '~/features/memo/hooks/use-fetch-memos-api';

export const useFetchMemos = () => {
  const { memos, isLoading, query } = useFetchMemosApi();

  useEffect(() => {
    query();
  }, []);

  return { memos, isLoading, refetch: query };
};
