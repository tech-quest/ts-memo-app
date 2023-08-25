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
      createdAt: memo.created_at,
    };
  });

  res.json(memos);
});

// ↑↑↑ バックエンド処理を記述して実際に開発してみましょう！！

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
