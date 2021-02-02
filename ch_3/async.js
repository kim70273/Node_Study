const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt',(err, data)=>{
    if(err){//에러 처리는 꼭 해줘야됨.
        throw err;
    }
    console.log('1번',data.toString());
});
fs.readFile('./readme2.txt',(err, data)=>{
    if(err){
        throw err;
    }
    console.log('2번',data.toString());
});
fs.readFile('./readme2.txt',(err, data)=>{
    if(err){
        throw err;
    }
    console.log('3번',data.toString());
});
console.log('끝');
//비동기라서 뭐가 먼저 실행될지 모름.
//fs.readFile 비동기 함수라서 백그란운드로 넘어감
