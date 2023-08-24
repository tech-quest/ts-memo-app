import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DefaultValues } from '~/app/update/[id]/components/update-memo-form';
import { useFindMemo } from '~/features/memo/hooks/use-find-memo';
import { useUpdateMemo } from '~/features/memo/hooks/use-update-memo';

export const useHooks = (id: string) => {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<DefaultValues | null>();

  const { memo, isLoading, query } = useFindMemo(id);
  const { success: updateSuccess, error: updateError, isLoading: updateLoading, mutate } = useUpdateMemo(id);

  const handleSubmit = (title: string, content: string) => {
    mutate({ title, content });
  };

  useEffect(() => {
    query();
  }, []);

  useEffect(() => {
    if (!memo) return;
    setDefaultValues({ title: memo.title, content: memo.content });
  }, [memo]);

  useEffect(() => {
    if (!updateSuccess) return;
    router.push('/');
  }, [updateSuccess]);

  return { defaultValues, isLoading, updateError, updateLoading, handleSubmit };
};
