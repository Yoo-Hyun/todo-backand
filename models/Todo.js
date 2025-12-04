const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  // 할일 내용
  title: {
    type: String,
    required: true,
    trim: true
  }
}, {
  // 생성일, 수정일 자동 관리
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);

