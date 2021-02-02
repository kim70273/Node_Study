const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
//라우터를 가져오는 부분.

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
//라우터를 불러서 쓴다.
// /user는 /과 합쳐져서 /user가 된다.
// 묶이는것 생길때마다 분리는 해주면 된다.

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});//404처리 미들웨어

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});//에러 처리 미들웨어

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});