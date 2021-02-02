const fs = require('fs');

//동기 메서드를 지원.
//사람이 이해하긴 쉽지만 비효율적.
//시작하기 전 초기화 작업등에 쓰임.
console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번',data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번',data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번',data.toString());
console.log('끝');