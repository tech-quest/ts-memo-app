import { PrismaClient } from '@prisma/client';
import express from 'express';

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

  res.json({ data: memos });
});

// http://localhost:8000/memos/detail/1
// http://localhost:8000/memos/detail/a -> 400 Bad Request
app.get('/memos/detail/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  const record = await prisma.memo.findUnique({ where: { id } });
  if (!record) {
    res.status(404).json({ error: { message: 'メモが見つかりませんでした。' } });
    return;
  }

  const memo = {
    id: record.id,
    title: record.title,
    content: record.content,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };

  res.json({ data: memo });
});

// http://localhost:8000/memos/create
app.post('/memos/create', async (req, res) => {
  const { title, content } = req.body;

  if (typeof title !== 'string' || !title) {
    res.status(400).json({ error: { message: 'タイトルまたは内容が未入力です' } });
    return;
  }

  if (typeof content !== 'string' || !content) {
    res.status(400).json({ error: { message: 'タイトルまたは内容が未入力です' } });
    return;
  }

  const record = await prisma.memo.create({ data: { title, content } });

  res.json({ data: { id: record.id.toString(10) } });
});

// http://localhost:8000/memos/update
app.post('/memos/update', async (req, res) => {
  const { memoId, title, content } = req.body;

  const id = Number(memoId);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  if (typeof title !== 'string' || !title) {
    res.status(400).json({ error: { message: 'タイトルまたは内容が未入力です' } });
    return;
  }

  if (typeof content !== 'string' || !content) {
    res.status(400).json({ error: { message: 'タイトルまたは内容が未入力です' } });
    return;
  }

  try {
    const record = await prisma.memo.update({ where: { id }, data: { title, content } });

    res.json({ data: { id: record.id.toString(10) } });
  } catch {
    res.status(500).json({ error: { message: 'データベース操作に失敗しました。' } });
  }
});

// http://localhost:8000/memos/delete
app.post('/memos/delete', async (req, res) => {
  const { memoId } = req.body;

  const id = Number(memoId);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  try {
    const record = await prisma.memo.delete({ where: { id } });

    res.json({ data: { id: record.id.toString(10) } });
  } catch {
    res.status(500).json({ error: { message: 'データベース操作に失敗しました。' } });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
