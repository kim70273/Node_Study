const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    //session 쿠키라서 브라우저 닫으면 사라진다.
    //쿠키가 셋팅된 후에 새로고침해서 get요청 보내면 
    //쿠키에 아까 서버가 보내준 쿠키가 있다.(서버쪽에서 브라우저가 누군지 알 수 있다.)
    res.end('Hello Cookie');
})
.listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다.');
});