const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    try{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const data = await fs.readFile('./server2.html');
    res.end(data);//html 파일을 읽어서 전송 하도록.
    }
    catch(error){
        console.error(error);//에러나면 서버가 멈춰버리니 에러 처리!
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        //plain은 일반 문자열.
        res.end(err.message);
    }
})
.listen(8084);

server.on('listening', () => {
    console.log('8084번 포트에서 서버 대기 중입니다.');
}); 
server.on('error', (error) => {
    console.error(error);
});