import { useDeleteMemo } from './use-delete-memo';
import { useFetchMemos } from './use-fetch-memos';

export const useHooks = () => {
  const { memos, isLoading, refetch } = useFetchMemos();
  const { deleteError, isDeleting, deleteMemo } = useDeleteMemo();

  const handleDelete = async (id: string) => {
    await deleteMemo({ memoId: id });
    await refetch();
  };

  return { memos, isLoading, deleteError, isDeleting, handleDelete };
};
