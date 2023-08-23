import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTestMemos = async () => {
  await prisma.memo.createMany({
    data: [
      {
        title: 'TypeScriptの学習',
        content: 'TypeScriptの学習をする\n- 変数\n- 配列\n- 関数\n etc...',
      },
      {
        title: 'TypeScriptの復習',
        content: 'TypeScriptの復習をする\n- 変数\n- 配列\n- 関数\n etc...',
      },
      {
        title: 'フレームワークの学習',
        content: 'フレームワークの学習をする\n- 変数\n- 配列\n- 関数\n etc...',
      },
    ],
  });
};
