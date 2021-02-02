const http = require('http');

const server = http.createServer((req, res) =>{//클라이언트에서 요청이 온다.
    //요청이오면 이 함수가 실행 되고 응답을 어떻게 보낼지.
    //응답을 거부도 할 수 있다.
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //HTML이라고 직접 알려주는것! charset=utf-8하면 한글까지 알아듣게함.
    res.write('<h1>Hello Node!</h1>');//HTML 태그 처럼 보낼 수 있다.
    res.end('<p>Hello Server!</p>');
});
// .listen(8083, () => {//서버도 프로그램이라 프로세스를 포트에 올려야 한다.
//     //서버 연결
//     console.log('8083번 포트에서 서버 대기 중입니다!');
//     //실행하면 여기서 계속 멈춰있게 됨 터미널 하나를 잡아먹음
//     //http://localhost:8083/ 주소창에 치면 요청 보내서 응답 받을 수 있음.

//     //https 443 
//     //http 80 이거두개는 약속된 포트라 생략가능
// });
server.listen(8083);//배포할땐 80으로 ! 80은 생략가능

server.on('listening', () => {//콜백을 여기로 뺄 수 있음
    console.log('8083번 포트에서 서버 대기 중입니다!');
});
server.on('error', (error) => {//비동기 니까 에러 처리 필요!
    console.log(error);
});

//코드 수정하면 서버를 한번 껐다가 켜야 수정된다

// const server1 = http.createServer((req, res) =>{//클라이언트에서 요청이 온다.
//     //요청이오면 이 함수가 실행 되고 응답을 어떻게 보낼지.
//     //응답을 거부도 할 수 있다.
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//     //HTML이라고 직접 알려주는것! charset=utf-8하면 한글까지 알아듣게함.
//     res.write('<h1>Hello Node!</h1>');//HTML 태그 처럼 보낼 수 있다.
//     res.end('<p>Hello Server!</p>');
// });
// server.listen(8084); //한번에 서버 2개를 실행됨. 3개 4개도 가능