import { useEffect, useState } from 'react';

import { useGetFetch } from '~/libs/hooks/use-get-fetch';
import { MemoUiModel } from '~/ui-models/memo';

type ApiResponseData = { id: string; title: string; createdAt: string };

export const useHooks = () => {
  const [memos, setMemos] = useState<MemoUiModel[]>([]);
  const { data, isLoading } = useGetFetch<ApiResponseData[]>('http://localhost:8000/memos');

  useEffect(() => {
    if (!data) return;
    const memos = convertToUiModel(data);

    setMemos(memos);
  }, [data]);

  return { memos, isLoading };
};

const convertToUiModel = (data: ApiResponseData[]): MemoUiModel[] => {
  return data.map((memo) => ({ id: memo.id, title: memo.title, createdAt: memo.createdAt }));
};
