'use client';

import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyMemoContainer } from '~/features/memo/components/memo-container';

import { MyMemoActions } from './components/memo-actions';
import { MyUpdateMemoForm } from './components/update-memo-form';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function MemoCreatePage({ params }: { params: Params }) {
  const { defaultValues, isLoading, updateError, updateLoading, handleSubmit } = useHooks(params.id);
  return (
    <MyPageContainer>
      <h1>メモ編集</h1>
      <MyMemoContainer>
        {updateError && <MyAlertMessage color="error">{updateError}</MyAlertMessage>}
        {!defaultValues && isLoading && <div>読み込み中...</div>}
        {defaultValues && (
          <MyUpdateMemoForm defaultValues={defaultValues} isSubmitting={updateLoading} onSubmit={handleSubmit} />
        )}
        <MyMemoActions id={params.id} />
      </MyMemoContainer>
    </MyPageContainer>
  );
}
