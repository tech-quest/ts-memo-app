import { useCreateMemo } from '~/features/memo/hooks/use-create-memo';

export const useHooks = () => {
  const { error, isLoading, handleSubmit } = useCreateMemo();

  return { error, isLoading, handleSubmit };
};
