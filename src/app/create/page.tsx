'use client';

import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyMemoContainer } from '~/features/memo/components/memo-container';

import { MyCreateMemoForm } from './components/create-memo-form';
import { useHooks } from './hooks';

export default function MemoCreatePage() {
  const { error, isCreating, handleSubmit } = useHooks();
  return (
    <MyPageContainer>
      <h1>新規メモ作成</h1>
      <MyMemoContainer>
        {error && <MyAlertMessage color="error">{error}</MyAlertMessage>}
        <MyCreateMemoForm isSubmitting={isCreating} onSubmit={handleSubmit} />
        <div>
          <MyButton asChild>
            <Link href="/">一覧に戻る</Link>
          </MyButton>
        </div>
      </MyMemoContainer>
    </MyPageContainer>
  );
}
