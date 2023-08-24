import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { usePostFetch } from '~/features/app/hooks/use-post-fetch';

type ApiResponseData = { id: string };

export const useCreateMemo = () => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = usePostFetch<ApiResponseData>('http://localhost:8000/memos/create');

  const handleSubmit = (title: string, content: string) => {
    mutate({ title, content });
  };

  useEffect(() => {
    if (!data) return;
    router.push('/');
  }, [data]);

  return { error, isLoading, handleSubmit };
};
