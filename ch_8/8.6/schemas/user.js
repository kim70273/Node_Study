const mongoose = require('mongoose');

const { Schema } = mongoose;//몽구스 안에 있는 스키마.
const userSchema = new Schema({//id는 오브젝트아이디로 들어 있어서 생략가능
  name: {
    type: String,
    required: true,//필수
    unique: true,//고유의 값, 몽구스에서 이렇게 옵션 설정하는게 생김
  },
  age: {
    type: Number,//기본 자바스크립트에서는 Int32라는게 없음
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,//옵션이 타입밖에 없을때는 이렇게 생략가능
  //required가 필수가 아님.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);