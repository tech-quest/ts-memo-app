import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';

import styles from './styles.module.css';

type Props = {
  id: string;
};

export const MyMemoActions = ({ id }: Props) => {
  return (
    <div className={styles.root}>
      <div>
        <MyButton asChild>
          <Link href="/">一覧に戻る</Link>
        </MyButton>
      </div>
      <div>
        <MyButton>削除</MyButton>
      </div>
    </div>
  );
};
