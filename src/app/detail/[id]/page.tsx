'use client';

import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyMemoContainer } from '~/features/memo/components/memo-container';

import { MyMemoActions } from './components/memo-actions';
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
      <MyMemoContainer>
        {!memo && isLoading && <div>読み込み中...</div>}
        {memo && <MyMemoDetail memo={memo} />}
        <MyMemoActions id={params.id} />
      </MyMemoContainer>
    </MyPageContainer>
  );
}
