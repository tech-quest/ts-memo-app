import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MemoDetailUiModel } from '~/ui-models/memo';

export const useHooks = (id: string) => {
  const [memo, setMemo] = useState<MemoDetailUiModel | null>(null);
  const router = useRouter();

  const fetchMemo = async () => {
    return await fetch(`http://localhost:8000/memo/${id}`, { method: 'GET', mode: 'cors' }).then(async (res) => {
      if (res.status === 404) {
        // TODO: 一旦雑な404だけ対応
        router.replace('/404');
      }
      const data = await res.json();

      const memo = {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      setMemo(memo);
    });
  };
  useEffect(() => {
    fetchMemo();
  }, []);

  return { memo };
};
