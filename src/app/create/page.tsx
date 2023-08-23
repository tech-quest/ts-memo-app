'use client';

import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/components/surface/layouts/page-container';

import { MyCreateMemoForm } from './components/create-memo-form';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function MemoCreatePage({ params }: { params: Params }) {
  const { isLoading, error, handleSubmit } = useHooks();
  return (
    <MyPageContainer>
      <h1>新規メモ作成</h1>
      {error && <MyAlertMessage color="error">{error}</MyAlertMessage>}
      <MyCreateMemoForm isSubmitting={isLoading} onSubmit={handleSubmit} />
    </MyPageContainer>
  );
}
