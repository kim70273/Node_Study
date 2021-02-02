const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt',{highWaterMark: 16});
//16바이트씩 읽으면서 압축을 한다음 쓴다.
const zlibStream = zlib.createGzip();
const writeSteam = fs.createWriteStream('./writeme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeSteam);
//스트림을 통해 다양한 파이프끼리 연결 할 수 있다.
//스트림을 지원하는것 끼리만 된다.