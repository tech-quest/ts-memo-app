import { useEffect } from 'react';

import { useFindMemoApi } from '~/features/memo/hooks/use-find-memo-api';

export const useFindMemo = (id: string) => {
  const { memo, isLoading, query } = useFindMemoApi(id);

  useEffect(() => {
    query();
  }, []);

  return { memo, isLoading };
};
