'use client';

import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyMemoContainer } from '~/features/memo/components/memo-container';

import { MyMemoActions } from './components/memo-actions';
import { MyMemoDetail } from './components/memo-detail';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function MemoDetailPage({ params }: { params: Params }) {
  const { memo, isLoading, deleteError, isDeleting, handleDelete } = useHooks(params.id);

  return (
    <MyPageContainer>
      <h1>メモ詳細</h1>
      <MyMemoContainer>
        {deleteError && <MyAlertMessage color="error">{deleteError}</MyAlertMessage>}
        {!memo && isLoading && <div>読み込み中...</div>}
        {memo && <MyMemoDetail memo={memo} />}
        <MyMemoActions id={params.id} onClickDelete={handleDelete} isDeleting={isDeleting} />
      </MyMemoContainer>
    </MyPageContainer>
  );
}
