import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DefaultValues } from '~/app/update/[id]/components/update-memo-form';
import { useGetFetch } from '~/libs/hooks/use-get-fetch';
import { usePostFetch } from '~/libs/hooks/use-post-fetch';

type GetApiResponseData = { id: string; title: string; content: string; createdAt: string; updatedAt: string };
type PostApiResponseData = { id: string };

export const useHooks = (id: string) => {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<DefaultValues | null>();

  const { data, isLoading } = useGetFetch<GetApiResponseData>(`http://localhost:8000/memos/detail/${id}`);
  const {
    data: updateData,
    error: updateError,
    isLoading: updateLoading,
    mutate,
  } = usePostFetch<PostApiResponseData>(`http://localhost:8000/memos/update/${id}`);

  const handleSubmit = (title: string, content: string) => {
    mutate({ title, content });
  };

  useEffect(() => {
    if (!data) return;
    setDefaultValues({ title: data.title, content: data.content });
  }, [data]);

  useEffect(() => {
    if (!updateData) return;
    router.push('/');
  }, [updateData]);

  return { defaultValues, isLoading, updateError, updateLoading, handleSubmit };
};
