const fs = require('fs');

const readStream = fs.createReadStream('readme3.txt',{highWaterMark:16});
//16바이트씩 읽은것이 16바이트씩 들어가게 됨.
const writeSteam = fs.createWriteStream('writeme3.txt');
//16바이트씩 읽어서 받아서 쓰게됨.
readStream.pipe(writeSteam);
//읽은것을 파이프를 통해 내보냄
//스트림 사이에 pipe 사용한것
//파일 복사 같은것.
