import { useDeleteMemo } from './use-delete-memo';
import { useFindMemo } from './use-find-memo';
import { useUpdateMemo } from './use-update-memo';

export const useHooks = (id: string) => {
  const { defaultValues, isLoading } = useFindMemo(id);
  const { updateError, isUpdating, handleSubmit } = useUpdateMemo(id);
  const { deleteError, isDeleting, handleDelete } = useDeleteMemo(id);

  return { defaultValues, isLoading, updateError, isUpdating, handleSubmit, deleteError, isDeleting, handleDelete };
};
