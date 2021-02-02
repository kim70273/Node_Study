//mysql2이용해서 mysql과 시퀄라이즈 연결하는 코드
const Sequelize = require('sequelize');
const User = require('./user');//두개를 불러옴
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);//init하면서 연결 객체를 넣어줌
//테이블과 모델과 시퀄라이저 연결
//모델과 mysql연결
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;