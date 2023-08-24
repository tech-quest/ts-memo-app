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
  const { defaultValues, isLoading, updateError, isUpdating, handleSubmit, deleteError, isDeleting, handleDelete } =
    useHooks(params.id);

  return (
    <MyPageContainer>
      <h1>メモ編集</h1>
      <MyMemoContainer>
        {updateError && <MyAlertMessage color="error">{updateError}</MyAlertMessage>}
        {deleteError && <MyAlertMessage color="error">{deleteError}</MyAlertMessage>}
        {!defaultValues && isLoading && <div>読み込み中...</div>}
        {defaultValues && (
          <MyUpdateMemoForm defaultValues={defaultValues} isSubmitting={isUpdating} onSubmit={handleSubmit} />
        )}
        <MyMemoActions onClickDelete={handleDelete} isDeleting={isDeleting} />
      </MyMemoContainer>
    </MyPageContainer>
  );
}
