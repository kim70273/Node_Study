const mongoose = require('mongoose');

const connect = () => {//커넥트 함수가 실행되면 몽구스가 연결된다.
  if (process.env.NODE_ENV !== 'production') {//배포가 아닐때 개발할때 
    mongoose.set('debug', true);//디버그 모드를 트루로. 터미널에 쿼리가 뜸.
    //쿼리가 제대로 날아가고 있는지 체크가능
  }
  mongoose.connect('mongodb://kim70273:kms0208235@@@localhost:27017/admin', {//아이디 비밀번호//프로토콜은 몽고디비 프로토콜
    dbName: 'nodejs',
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();//연결 재시도.
});

module.exports = connect;//app.js에서 가져와서 실행하도록.