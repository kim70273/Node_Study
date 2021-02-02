const express = require('express');
//express 열어 보면 http 서버를 쓰고 있음. 내부적으로!
const path = require('path');//경로를 확실히 하기 위해.

/*
1. app을 만든다름
2. app에 관련된 설정을 sset으로 해줌
3. 공통 미들웨어를 넣어주고
4. 라우터를 넣어줌(범위 넓을 수록 뒤로)
5. 그다음 에러 미들웨어를 넣어 줌
 */
const app = express();
app.set('port', process.env.PORT || 3000);//서버에 속성을 심는것!
//포트를 입력 하지 않으면 기본적으로 3000
// SET PORT=80 이라고 터미널에 쳐서 바꿀 수 있지만 이렇게 하는 거 좋지 않음

app.use((req, res, next) => {
    console.log('1번 모든 요청에 실행하고싶어요');
    next();//next를 넣어야 요청된 라우터 까지 같이 실행됨
},
(req, res, next) => {
    console.log('2번 모든 요청에 실행하고싶어요');
    next();
},
(req, res, next) => {
    console.log('3번 모든 요청에 실행하고싶어요');
    next();
},
(req, res, next) => {
    //throw new Error('에러가 났어요');
    //에러 몇번째 줄이라 표시됨.
    //express는 기본적으로 알아서 에러 처리해줌
    //하지만 너무 상세하게 서버를 공개해서 에러 알려주기때문에
    //직접 에러 처리를 해줘야한다.

    try{
        console.log('에러어');
        throw new Error('에러어어');
    } catch(error){
        next(error);
        //next()에 인수가 없으면 다음 미들웨어로 넘어가지만
        //인수가 들어가 있으면 바로 에러처리 미들웨어로 넘어감

        //next('route')를 한다면 같은 라우터에 다음 미들웨어가 아니라
        //다른 라우터에 미들웨어가 실행됨
        //다음 라우터 부터 다시 찾게 됨.
        //if문 같은거 안에다 넣을 수 있음.
    }

});//모든 라우터에 다 실행되어서 중복을 피함
//메소드와 주소가 있는것을 라우터라함.

//app.use('/about', ...)이라 하면 about에서만 실행됨

//req, res, next가 있는 함수를 미들웨어라함.

//미들웨어를 한개에 여러개 넣어줄 수 있음.
//next()를 만나면 밑으로 쭉 내려감

app.get('/', (req, res) =>{//요청의 메소드와 url / if문으로 도배하지 않아도 됨.
    //res.sendFile(path.join(__dirname,'index.html'));
    //경로를 확실히 해서 html 서빙도 간단하게 express로 가능.

    //한 라우터에서 여러번 send할수 없다.
    //sendFile, send, json
    //next통해서 2번이상 나와도 에러남.
    //이미 응답을 한번 보내면 끝남. 
    //요청한번에 응답은 한번임!
    //응답 보낸다음 res.writeHead 뒤 늦게 해도 에러

    //express는 http의 writeHead와 end를 합쳐둔것.
    //여기서도 쓸 수는 있음. (기본 http것 쓰는것 추천하지 않음)

    //res.json({hello: 'kim70273'}); return re.json...이라면 밑에가 실행 안됨
    //console.log('hello');  res.json은 리턴이 아님 따라서 콘솔로그도 찍힘
    //

    res.json({hellp:'kim70273'});
    //res.writeHead(200, {'Content-Type': 'application/json'});
    //res.end(JSON.stringify({hello: 'kim70273'})); 이코드를 줄여준것.

    //api서버를 만들면 res.json을 많이 씀.
    //웹 서버는 res.sendFile을 많이 씀
    //res.render() 이것도 응답을 보내는것.
});

//get에도 next가 있다.
//라우터에 미들웨어를 장착함

app.post('/', (req, res) =>{
    res.send('Hello Express');
});

app.get('/category/:name', (req, res) => {//와일드카드를 쓴것.
    res.send(`hello ${req.params.name}`);
    //next를 안해줬으니 여기서 끝남.
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello`);//와일드카드 밑에 이렇게 쓰면
    //이 부분이 안나옴. 위에서부터 아래로 실행 되기 때문임.
    //와일드카드는 보통 다른 미들웨어보다 아래에 위체 해야됨.
});

//위에서 부터 아래로 실행 되지만 /about 이 주소라면
//위에것들은 일치하지 않아서 실행 안됨
app.get('/about', (req, res) =>{//안 만들어 둔것 express가 알아서 에러 처리해줌
    res.send('Hello Express');// /abouta라 하면 에러
});

app.get('*', (req, res) =>{//모든 겟 요청!( 맨 위에 있으면 안됨)
    res.send('Hello Express');// 
});//범위가 넓은 라우터들은 밑에다가 넣어주도록한다.
//와일드카드 라우터가 있으면 404가 뜨지 않음

app.use((req,res, next) => {
    res.status(404).send('404지롱');
    //기본적으로 status(200)이 생략 되어 있다.
    // 200은 성공
    // 서버쪽에서 400이라도 브라우저에  200이라고 할수도 있음.(이렇게 보안 위협 낮출 수 있음)
    // 코드가 해커들한테 힌드가 되지 않도록. (그래서 실무에서 200번대를 많이 써줌. or 404로 통일)

    //이런식으로 404에러도 직접 커스터마이징 가능 
    //라우터들 모두 검색 했는데 안떴는것!
});

app.use((err, req, res, next) => {//에러 미들웨어!
    //err가 들어가고 반드시 생략없이 4개가 들어가 있어야됨.!!!
    console.error(err);
    res.status(500).send('에러났지롱. 근데 안알려주지롱 핳');
    //매개 변수가 다르면 자바스크립트에서 다른 함수로 인식.

    //무슨 에러인지는 서버창에서만 기록!
})

app.listen(app.get('port'), () => {//port심어둔 것을 가져 올 수 있다.
    console.log(app.get('port'),'번 포트에서 대기 중');
});