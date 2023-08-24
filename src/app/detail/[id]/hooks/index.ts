import { useEffect } from 'react';

import { useFindMemo } from '~/features/memo/hooks/use-find-memo';

export const useHooks = (id: string) => {
  const { memo, isLoading, query } = useFindMemo(id);

  useEffect(() => {
    query();
  }, []);

  return { memo, isLoading };
};
