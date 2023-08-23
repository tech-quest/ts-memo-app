import { MyMultilineString } from '~/components/elements/typographies/multiline-string';
import { MyPanel } from '~/components/surface/panels/panel';
import { MemoDetailUiModel } from '~/ui-models/memo';

import styles from './styles.module.css';

type Props = { memo: MemoDetailUiModel };

export const MyMemoDetail = ({ memo }: Props) => {
  return (
    <MyPanel>
      <div className={styles.field}>
        <div className={styles.label}>タイトル</div>
        <MyMultilineString value={memo.title} />
      </div>
      <div className={styles.field}>
        <div className={styles.label}>内容</div>
        <MyMultilineString value={memo.content} />
      </div>
    </MyPanel>
  );
};
