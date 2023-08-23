'use client';

import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyPageContainer } from '~/components/surface/layouts/page-container';

import { MyMemoDetail } from './components/memo-detail';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function MemoDetailPage({ params }: { params: Params }) {
  const { memo, isLoading } = useHooks(params.id);

  return (
    <MyPageContainer>
      <h1>メモ詳細</h1>
      {!memo && isLoading && <div>読み込み中...</div>}
      {memo && <MyMemoDetail memo={memo} />}
      <div>
        <MyButton asChild>
          <Link href="/">一覧に戻る</Link>
        </MyButton>
      </div>
    </MyPageContainer>
  );
}
