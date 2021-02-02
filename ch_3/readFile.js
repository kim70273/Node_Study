const fs = require('fs');
//파일 시스템 접근 모듈

fs.readFile('./readme.txt',(err, data)=>{
    //노드에서는 항상 콜백이 err,data 순서.
    if(err){
        throw err;
    }
    console.log(data);
    //0, 1 바이너리 데이터로 나옴. (16진법으로)
    console.log(data.toString());
    //사람이 읽을 수 있게 바꿈.
});