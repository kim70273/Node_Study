const http = require('http');

//서버를 생성
//요청이 오면 밑의 함수가 실행 됨.
const server = http.createServer((req, res) => {//비동기라서 변수에 할당하고 에러처리 필요.
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});//HTML이라 알리는 부분
    res.write('<h1>hello1</h1>');
    res.write('<p>hello2</p>');
    res.end('<p>hello3</p>');//각각이 스트림이다.
})//서버도 프로그램이라 프로세스를 올려야됨(포트 하나 필요.)
.listen(8084, () => {//배포할때 80번으로 배포하면 주소창에서 생략 가능.
    console.log('8084번 포트에서 서버 대기 중입니다.');
    //8080번과 연결이 되면 이 부분이 실행 됨.
});

// server.on('listening', () => {
//     console.log('8084번 포트에서 서버 대기 중입니다.');
// }); 콜백을 여기로 뺄 수도 있다.
server.on('error', (error) => {
    console.error(error);
});


//서버를 listen하는 경우 터미널하나를 잡아먹음.
//브라우저(클라이언트)에서  서버(localhost)로 접근 가능