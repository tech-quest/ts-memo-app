import express from 'express';
import { memosDatabase } from './dummy-database/memos';

const app = express();
const port = 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:8000/memos
app.get('/memos', (req, res) => {
  const memos = memosDatabase.map((memo) => {
    return {
      id: memo.id,
      title: memo.content,
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
