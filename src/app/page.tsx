'use client';

import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';

import { MyMemoList } from './components/memo-list';
import { useHooks } from './hooks';

export default function HomePage() {
  const { memos, isLoading, deleteError, isDeleting, handleDelete } = useHooks();

  return (
    <MyPageContainer>
      <h1>メモ一覧</h1>
      {deleteError && <MyAlertMessage color="error">{deleteError}</MyAlertMessage>}
      {isLoading ? (
        <div>読み込み中...</div>
      ) : (
        <MyMemoList memos={memos} onClickDelete={handleDelete} isDeleting={isDeleting} />
      )}
      <div>
        <MyButton color="secondary" asChild>
          <Link href="/create">メモを作成する</Link>
        </MyButton>
      </div>
    </MyPageContainer>
  );
}
