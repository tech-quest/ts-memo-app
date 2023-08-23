import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MemoUiModel } from '~/ui-models/memo';

import styles from './styles.module.css';

type Props = {
  memos: MemoUiModel[];
};

export const MyMemoList = ({ memos }: Props) => {
  if (!memos.length) {
    return <div>メモがありません。作成をしてメモを残しましょう！</div>;
  }

  return (
    <ul className={styles.root}>
      {memos.map((memo) => (
        <li key={memo.id} className={styles.memo}>
          <div className={styles.body}>
            <div className={styles.sub}>
              <div className={styles.datetime}>{memo.createdAt}</div>
            </div>
            <Link href={`/detail/${memo.id}`} className={styles.content}>
              {memo.title}
            </Link>
          </div>
          {/* <div className={styles.actions}>
            <div>
              <MyButton color="secondary" size="small" asChild>
                <a href="/edit/index.php?id=<?php echo $memo['id']; ?>">編集</a>
              </MyButton>
            </div>
            <div>
              <MyButton size="small">削除</MyButton>
            </div>
          </div> */}
        </li>
      ))}
    </ul>
  );
};
