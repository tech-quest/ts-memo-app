import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useUpdateMemoApi } from '~/features/memo/hooks/use-update-memo-api';

export const useUpdateMemo = (id: string) => {
  const router = useRouter();

  const { success, error, isUpdating, updateMemo } = useUpdateMemoApi();

  const handleSubmit = (title: string, content: string) => {
    updateMemo({ memoId: id, title, content });
  };

  useEffect(() => {
    if (!success) return;
    router.push('/');
  }, [success]);

  return { updateError: error, isUpdating, handleSubmit };
};
