import { useEffect, useState } from 'react';

import { usePostFetch } from '~/features/app/hooks/use-post-fetch';

type ApiResponseData = { id: string };

export const useUpdateMemo = (id: string) => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const { data, error, isLoading, mutate } = usePostFetch<ApiResponseData>(`http://localhost:8000/memos/update/${id}`);

  useEffect(() => {
    if (!data) return;

    if (error) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }, [data, error]);

  return { success, error, isLoading, mutate };
};
