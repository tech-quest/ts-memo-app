import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useDeleteMemoApi } from '~/features/memo/hooks/use-delete-memo-api';

export const useDeleteMemo = () => {
  const router = useRouter();

  const { success, error, isDeleting, deleteMemo } = useDeleteMemoApi();

  useEffect(() => {
    if (!success) return;
    router.push('/');
  }, [success]);

  return { deleteError: error, isDeleting, deleteMemo };
};
