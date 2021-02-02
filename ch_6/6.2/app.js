const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//express-session을 넣으면 req.session이 생김
//req.session이 그 사용자에 대한 고유한 session
//req.session.id='hello'하면 요청한 사용자만 hello가 됨
//express-session이 개인의 공간을 제공

const dotenv = require('dotenv');
//설정이나 비밀키를 관리하는 용도로 쓸수있음
//cookieParser(process.env.COOKIE_SECRET) 이런데 비밀키가 들어감
//소스코드에 그대로 들어있으면 위험함.
//process.env.COOKIE_SECRET 환경 변수에 숨겨둠
//모든 비밀키를 모아두고 관리하기가 편함
dotenv.config();
//최대한 위에서 불러옴
//프로세스 env 쓰는것보다 위에 써줘야 됨.
// .env파일은 다른곳에 올리면 안된다.
//비밀키도 권한마다 다르게 주는게 좋음.

const path = require('path');
const app = express();
app.set('port', process.env.PORT || 3000);

//미들웨어간 순서도 중요.
/**
 morgan은 무조건실행
 요청한것 이있다면 제공
 static이 제공 되면 다음것이 실행 안됨 (next를 안하니 뒤에 실행 못함)
 */
app.use(morgan('dev'));//클라이언트에서 어떤 요청이오고, 얼마나 걸렸는지, 몇바이트응답했는지
//정보들이 서버에 기록됨. (어떻게 응답 했는지)
//요청과 응답을 기록
//app.use(morgan('combined')); 이게더 상세하게 나옴(실무에서 씀)

app.use('/', express.static(path.join(__dirname, 'public')));
//앞은 요청경로 뒤에가 실제 경로.
//누가 localhost:3000/zerocho.html 을 요청할때 
//실제 경로는 /public/zerocho.html 인것
//정적 파일제공. 보안에 좋음(서버 구조를 예측하지 못하도록)

//요청 주소에 따라서 미들웨어가 어디까지 실행되는지가 다름.

app.use(express.json());
app.use(express.urlencoded({ extended: true}));//대부분 true로 하는거 추천
//body parser
//이것을 넣어두면 데이터가 알아서 파싱이 된다. req.body.name 이런식으로 바로
//클라이언트에서 보내는 부분을 쓸 수 있다.
//form 데이터에서 이미지나 파일 보낼땐 urlencoded가 처리 못함
//multer를 써야됨

app.use(cookieParser(process.env.COOKIE_SECRET));//쿠키를 암호화
app.use(session({
  resave: false,
  saveUninitialized: false, //보통 두개 false로 둠 
  secret: process.env.COOKIE_SECRET, //쿠키와 비슷
  cookie: {//httpOnly!! 자바스크립트로 사용 못하도록
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',//기본 값은 connect.sid이며 서명되어서 
  //읽을 수 없게 되어 있음.
}));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');//서버시작전에 폴더 확인하는거라 Sync 써도 됨
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({ //멀터 함수를  호출
  storage: multer.diskStorage({//디스크에 저장 메모리에 저장도 가능(껏다키면 사라짐), 클라우드 저장소도 가능
    destination(req, file, done) {
      done(null, 'uploads/');//현재 폴더의 uploads폴더에 저장. 서
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);//확장자 추출
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);//어떤 이름으로 올릴지
      //이름이 같으면 덮어 씌아지기때문에 현재시간도 널어줬음(동시에 같은 초에 될 확률이 적음)
      //done은 첫번째 인수는 에러처리, 두번째 인수에 성공했을때의 값 넣으면됨
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },//파일 사이즈나 파일 갯수
  //5메가 바이트 까지 가능 그 이상으로 하면 400번대 에러가 생김
});
//storage와 limits 옵션을 자주 씀.
//storage: 업로드한 파일을 머디 저장할지


app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
//셋팅한 upload를 라우터에 장착
app.post('/upload', upload.single('image'), (req, res) => {//upload안에 single이라는 미들웨어가 있음
  console.log(req.file);//업도드된 정보를 req.file에 널어줌
  res.send('ok');
});
//upload.single 한개의 파일만 업로드할때.
//html의 image 이름과 맞춰줌.
//여러개 받을땐 single이 아닌 array로 받아야한다.

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});