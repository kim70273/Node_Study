const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용
const coments = {}; //코멘트 저장용
//기본적으로 http만 써서 서버 만들땐 이런식으로 만듬

http.createServer(async (req, res) => { //서버를 생성
  try {//요청이 오면 어떤 응답을 할지.
    if (req.method === 'GET') {//req가 요청에 관한것.(요청에 관한 정보를 얻는다.)
      if (req.url === '/') {//메인 페이지 가져오는것 GET 요청(주소차엥 검색 하는것.)
        const data = await fs.readFile('./restFront.html');
        //이 파일을 읽어서 전달하겠다.
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') { //about으로 GET (a태그)
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {//사용자를 가져옴
        //저장된 사용자를 불러옴. (메모리에 저장되는 것이라 서버 재시작하면 정보 지워짐.)
        //application/json html이 아니라 json으로 보냄 stringify해줘야됨.
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));
      } else if (req.url === '/coments') {//사용자를 가져옴
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(coments));
    }
      // /도 /about도 /users도 아니면 이 부분. 폴더에서 찾는것!
      try {// css와 js''''파일''''!!을 프론트로 보내줌
        //모두 코딩해서 직접 보내줘야 됨 html에서 자동으로 보내는게
        // 아님 html에서 서버에 요청을 보내는것임!
        //css, js에 src="./~~"이런것도 서버에 get요청을 보내는것.
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    } 
    else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';//서버에서 데이터를 받는 형식!!
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });//chunk들을 모아서 
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          //요청 보낸것과 똑같이 받게 됨
          const id = Date.now(); //사용자 등록
          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          //'201' 요청이 성공적이며 생성됨.
          //<사용자 등록 라우터> const users = {}가 존재해야 실행됨
          res.end('ok');
        });
      }else if(req.url === '/coment'){
        let body = '';//서버에서 데이터를 받는 형식!!
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });//chunk들을 모아서 
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { coment } = JSON.parse(body);
          //요청 보낸것과 똑같이 받게 됨
          const id = Date.now(); //사용자 등록
          coments[id] = coment;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          //201 요청이 성공적이며 생성됨.
          res.end('ok');
        });
      }
    } else if (req.method === 'PUT') {//데이터 받아서 수정
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        });
      }
    } else if (req.method === 'DELETE') {//데이터 받아서 삭제
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }
    res.writeHead(404);//요청에 대한 정보를 찾지 못 했을 때.
    //모든것을 찾지 못함.
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => {//서버를 8082에 연결
    console.log('8082번 포트에서 서버 대기 중입니다');
  });