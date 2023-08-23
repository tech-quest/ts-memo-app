import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { usePostFetch } from '~/libs/hooks/use-post-fetch';

type ApiResponseData = { id: string };

export const useHooks = () => {
  const router = useRouter();
  const { data, error, isLoading, fetchApi } = usePostFetch<ApiResponseData>('http://localhost:8000/memos/create');

  const handleSubmit = (title: string, content: string) => {
    fetchApi({ title, content });
  };

  useEffect(() => {
    if (!data) return;
    router.push('/');
  }, [data]);

  return { error, isLoading, handleSubmit };
};
