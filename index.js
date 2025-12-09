require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결 URI (로컬 MongoDB)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-db';

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터 연결
const todoRouter = require('./routes/todoRouter');
app.use('/todos', todoRouter);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend API가 정상적으로 실행중입니다!' });
});

// MongoDB 연결 후 서버 시작
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('연결 성공');
    app.listen(PORT, () => {
      console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
    });
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error.message);
  });
