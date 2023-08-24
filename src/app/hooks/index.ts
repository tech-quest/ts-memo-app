import { useEffect } from 'react';

import { useFetchMemos } from '~/features/memo/hooks/use-fetch-memos';

export const useHooks = () => {
  const { memos, isLoading, query } = useFetchMemos();

  useEffect(() => {
    query();
  }, []);

  return { memos, isLoading };
};
