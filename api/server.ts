import { PrismaClient } from '@prisma/client';
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

declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient | undefined;
}

const initPrisma = () => {
  if (process.env.NODE_ENV === 'production') return new PrismaClient();

  const db = (global.__db__ = global.__db__ ?? new PrismaClient());
  db.$connect();
  return db;
};

const prisma = initPrisma();

// http://localhost:8000/memos
app.get('/memos', async (req, res) => {
  const records = await prisma.memo.findMany();
  const memos = records.map((memo) => {
    return {
      id: memo.id,
      title: memo.title,
      createdAt: memo.createdAt,
    };
  });

  res.json(memos);
});

// http://localhost:8000/memos/detail/1
// http://localhost:8000/memos/detail/a -> 404 Not Found
app.get('/memos/detail/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    console.log(id);
    res.status(404).json({ message: 'メモが見つかりませんでした。' });
    return;
  }

  const record = await prisma.memo.findUnique({ where: { id } });
  if (!record) {
    res.status(404).json({ message: 'メモが見つかりませんでした。' });
    return;
  }

  res.json({
    id: record.id,
    title: record.title,
    content: record.content,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
});

// http://localhost:8000/memos/create
app.post('/memos/create', async (req, res) => {
  const { title, content } = req.body;

  if (typeof title !== 'string' || !title) {
    res.status(400).json({ message: 'タイトルまたは内容が未入力です' });
    return;
  }

  if (typeof content !== 'string' || !content) {
    res.status(400).json({ message: 'タイトルまたは内容が未入力です' });
    return;
  }

  const record = await prisma.memo.create({ data: { title, content } });

  res.json({ id: record.id.toString(10) });
});

// http://localhost:8000/memos/update/1
// http://localhost:8000/memos/update/a -> 400 Bad Request
app.post('/memos/update/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'データベース操作に失敗しました。不正な ID 操作が行われた可能性があります。' });
    return;
  }

  const { title, content } = req.body;

  if (typeof title !== 'string' || !title) {
    res.status(400).json({ message: 'タイトルまたは内容が未入力です' });
    return;
  }

  if (typeof content !== 'string' || !content) {
    res.status(400).json({ message: 'タイトルまたは内容が未入力です' });
    return;
  }

  try {
    const record = await prisma.memo.update({ where: { id }, data: { title, content } });

    res.json({ id: record.id.toString(10) });
  } catch {
    res.status(400).json({ message: 'データベース操作に失敗しました。不正な ID 操作が行われた可能性があります。' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
