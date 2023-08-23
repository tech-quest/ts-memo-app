'use client';

import { MyPageContainer } from '~/components/surface/layouts/page-container';

import { MyMemoDetail } from './cmoponents/memo-detail';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function MemoDetailPage({ params }: { params: Params }) {
  const { memo } = useHooks(params.id);

  return (
    <MyPageContainer>
      <h1>メモ一覧</h1>
      {memo && <MyMemoDetail memo={memo} />}
    </MyPageContainer>
  );
}
