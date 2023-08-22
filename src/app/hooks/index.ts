import { useEffect, useState } from 'react';

import { MemoUiModel } from '~/ui-models/memo';

export const useHooks = () => {
  const [memos, setMemos] = useState<MemoUiModel[]>([]);

  const fetchMemos = async () => {
    return await fetch('http://localhost:8000/memos', { method: 'GET', mode: 'cors' }).then(async (res) => {
      const data = await res.json();

      const memos = data.map((memo) => {
        return {
          id: memo.id,
          title: memo.title,
          createdAt: memo.createdAt,
        };
      });

      setMemos(memos);
    });
  };
  useEffect(() => {
    fetchMemos();
  }, []);

  return { memos };
};
