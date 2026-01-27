const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const authRouter = require('./routes/auth.routes');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('서버 정상 작동 + DB 연결 완료');
});

app.listen(3000, () => {
  console.log('서버 실행됨 http://localhost:3000');
});
