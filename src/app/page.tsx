'use client';

import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyPageContainer } from '~/features/app/components/page-container';

import { MyMemoList } from './components/memo-list';
import { useHooks } from './hooks';

export default function HomePage() {
  const { memos, isLoading } = useHooks();

  return (
    <MyPageContainer>
      <h1>メモ一覧</h1>
      {isLoading ? <div>読み込み中...</div> : <MyMemoList memos={memos} />}
      <div>
        <MyButton color="secondary" asChild>
          <Link href="/create">メモを作成する</Link>
        </MyButton>
      </div>
    </MyPageContainer>
  );
}
