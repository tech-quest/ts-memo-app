'use client';

import { MyPageContainer } from '~/components/surface/layouts/page-container';

import { MyMemoList } from './components/memo-list';
import { useHooks } from './hooks';

export default function HomePage() {
  const { memos } = useHooks();

  return (
    <MyPageContainer>
      <h1>メモ一覧</h1>
      <MyMemoList memos={memos} />
    </MyPageContainer>
  );
}
