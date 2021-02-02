const mongoose = require('mongoose');
//실제로 생각보다 컬렉션에 자유로운 데이터가 들어오는 경우가 적다.
//대부분 구조를 가지고 서로 관계를 가짐
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;//여기서 꺼내줘야됨
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,//mongus.Schema.Types.ObjectId
    required: true,
    ref: 'User',//스키마의 유저스키마.
    //시퀄라이즈의 include같은 기능을 몽구스에서 도와줌.
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);