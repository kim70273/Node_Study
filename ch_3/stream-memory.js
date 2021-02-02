const fs = require('fs');

console.log('before: ',process.memoryUsage().rss);
//메모리 체크

const readStream = fs.createReadStream('./big.txt');
const writeSteam = fs.createWriteStream('./big3.txt');
readStream.pipe(writeSteam);
readStream.on('end',()=>{
    console.log('stream: ', process.memoryUsage().rss);
})
//버퍼 방식과 메모리 사용량 비교하면 
//스트림 방식이 메모리 사용량이 적음
//메모리가 효율적