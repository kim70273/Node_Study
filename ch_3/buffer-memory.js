const fs = require('fs');

console.log('before: ',process.memoryUsage().rss);
//메모리 체크

const data1 = fs.readFile('./big.txt');
//통째로 옮김. 서버메모리가 1기가가 필요!
fs.writeFileSync('./big2.txt',data1);
console.log('buffer: ',process.memoryUsage().rss);
