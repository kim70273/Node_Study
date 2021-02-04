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
    httpOnly: true,//자바스크립트로 공격을 안당하기 위해 
    secure: false,
  },
  name: 'session-cookie',// 기본적으로는 connect.sid라 되어있음. 서명되어있기때문에 읽을수 없는 문자열로 됨
}));
/* 
app.use('/', (req, res, next) =>{
  if(session.id){
    express.static(__dirname, 'public')(req, res, next) 미들웨어 확장법!!(미들웨어안에 다른사람이 만든 미들웨어를 넣는것)
  }
  else{
    next();
  }
  
}
  ); 이런식으로 미들웨어안에 미들웨어 넣는것도 많이 쓰이는 패턴임.
  로그인 한 사람에게만 뭔가 보여주고 싶을때!
*/

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