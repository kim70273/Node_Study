const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data)=>{
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme2.txt', (err, data)=>{
        if(err){
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme2.txt', (err, data)=>{
            if(err){
                throw err;
            }
            console.log('3번', data.toString());
            console.log('끝');
        })
    })
})
//콜백 헬이 생김
//동기식이랑 차이??
//10개 실행해도 전부 백그라운드로 넘어가서 동시에 실행됨
//동시성을 살릴 수 있다.
//콜백 헬이 발생하니 프로미스로 깔끔 하게 만들어줌