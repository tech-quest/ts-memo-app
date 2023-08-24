import { useDeleteMemo } from './use-delete-memo';
import { useFindMemo } from './use-find-memo';

export const useHooks = (id: string) => {
  const { memo, isLoading } = useFindMemo(id);
  const { deleteError, isDeleting, handleDelete } = useDeleteMemo(id);

  return { memo, isLoading, deleteError, isDeleting, handleDelete };
};
