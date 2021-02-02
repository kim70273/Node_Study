const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});//문자열을 객체로 바꿔주는 함수

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }이런식으로 객체가 됨
  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {//로그인 응답을 주는 곳
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);//쿼리 스트링에서 name을 추출
    const expires = new Date();
    // 쿠키 유효 시간을 현재시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, { //302(301)는 리다이렉션 이 주소로 다시 보내라.
      Location: '/', //로그인으로 요청 보냈지만 /로 돌아옴
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    }); //한글이면 encodeURIComponent 해야됨   쿠키의 만료기간 따로설정(안하면 세션쿠키-브라우저 끄면 사라짐) ㄴ자바스크립트로 쿠키 접근하지못하게 HttpOnly(보안을 위해)
    //path=/는 /아래 주소에서는 쿠키가 다 유효하다는 뜻.
    //Application에 쿠키를 보면 옵션들이 다 저장되어있다.
    //쿠키에는 안전 장치들이 마련 되어 있다.(로그인때 쓰면 좋음, 아니면 직접 다 구현해야 됨)
    res.end();
  // name이라는 쿠키가 있는 경우!! 쿠키에 네임을 넣었을때 /주소에 여기가 실행됨
  } else if (cookies.name) {//쿠키가 있냐 없냐에 따라 다른 화면이 그려짐.
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else {//쿠키가 없는 경우
    try {//쿠키 시간이 다 되었을때도 여기가 실행됨.
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });