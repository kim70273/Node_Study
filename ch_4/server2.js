const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try{
        const data = await fs.readFile('./server2.html');
        //html 파일을 읽어서 보내주도록.
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    }catch(err){//async에는 에러 처리를 해줘야 한다.
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        //plain은 일반 문자열
        res.end(err.message);
    }
})
.listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다.');
});
//새로고침도 서버에 요청을 보내는 것 이다.