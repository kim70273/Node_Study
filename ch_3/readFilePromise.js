const fs = require('fs').promises;
//파일 시스템 접근 모듈
//프로미스를 붙여서 프로미스 방식으로 사용.
//콜백 헬을 피하기 위해. 

fs.readFile('./readme.txt')
.then((data) => {
    console.log(data);
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
});