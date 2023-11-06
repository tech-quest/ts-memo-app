import express from 'express';

import { memosDatabase } from './dummy-database/memos';
import { applyServerSettings } from './settings';

const app = express();
const port = 8000;

// Middlewares and settings
applyServerSettings(app);

// ↓↓↓ バックエンド処理を記述して実際に開発してみましょう！！

// APIのURL http://localhost:8000/memos
// 作成が完了したら http://localhost:3000 にアクセスして確認してみましょう！
app.get('/memos', (req, res) => {
  const memos = memosDatabase.map((memo) => {
    return {
      id: memo.id,
      title: memo.title,
      createdAt: formatDateInJa(memo.created_at),
    };
  });

  res.json({ data: memos });
});

// APIのURL http://localhost:8000/memos/detail/1
// 存在しないIDを指定した場合 http://localhost:8000/memos/detail/a -> 404 Not Found
// 作成が完了したら http://localhost:3000/detail/1 にアクセスして確認してみましょう！
app.get('/memos/detail/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  const memo = memosDatabase.find((memo) => {
    return memo.id === id;
  });

  if (!memo) {
    res.status(404).json({ error: { message: 'メモが見つかりませんでした' } });
    return;
  }

  res.json({
    data: {
      id: memo.id,
      title: memo.title,
      content: memo.content,
      createdAt: formatDateInJa(memo.created_at),
      updatedAt: formatDateInJa(memo.updated_at),
    },
  });
});

const formatDateInJa = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// ↑↑↑ バックエンド処理を記述して実際に開発してみましょう！！

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
