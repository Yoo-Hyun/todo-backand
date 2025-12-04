const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: '할일 내용을 입력해주세요.' });
    }

    const todo = new Todo({ title });
    await todo.save();
    
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 할일 목록 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: '할일 내용을 입력해주세요.' });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }

    res.json({ message: '할일이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

module.exports = router;

