import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGetFetch } from '~/libs/hooks/use-fetch';
import { MemoDetailUiModel } from '~/ui-models/memo';

type ApiResponseData = { id: string; title: string; content: string; createdAt: string; updatedAt: string };

export const useHooks = (id: string) => {
  const [memo, setMemo] = useState<MemoDetailUiModel | null>(null);

  const { data, isLoading } = useGetFetch<ApiResponseData>(`http://localhost:8000/memo/${id}`);

  useEffect(() => {
    if (!data) return;

    setMemo(convertToUiModel(data));
  }, [data]);

  return { memo, isLoading };
};

const convertToUiModel = (data: ApiResponseData): MemoDetailUiModel => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
