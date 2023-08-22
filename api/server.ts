import express from 'express';

import { memosDatabase } from './dummy-database/memos';

const app = express();
const port = 8000;

// Middlewares and settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.APP_URL || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});

// http://localhost:8000/memos
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

// http://localhost:8000/memo/1
// http://localhost:8000/memo/a -> 404 Not Found
app.get('/memo/:id', (req, res) => {
  const id = req.params.id;

  const memo = memosDatabase.find((memo) => {
    return memo.id === id;
  });

  if (!memo) {
    res.status(404).json({ message: 'メモが見つかりませんでした' });
    return;
  }

  res.json({
    id: memo.id,
    title: memo.title,
    content: memo.content,
    createdAt: memo.created_at,
    updatedAt: memo.updated_at,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
