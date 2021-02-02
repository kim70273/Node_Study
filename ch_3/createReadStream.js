const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt',{highWaterMark:16});
//readme3를 조각 내서 읽음 16바이트씩 나눔
//만약 16을 안 적으면 한전에 64kb를 읽음
//스트림방식이 버퍼방식에 비해 메모리를 아낄수 있다.
const data = [];

readStream.on('data', (chunk)=>{//조각 조각이 chunk로온다
    data.push(chunk);//chunk를 모아준다.
    console.log('data: ',chunk, chunk.length);
})//조각 조각 낸것이 순서대로 들어온다.
readStream.on('end',()=>{
    console.log('end: ', Buffer.concat(data).toString());
})//흩뿌려진것을 모음

readStream.on('error', (err)=>{//비동기들은 전부 에러 처리를 해줘야한다.
    console.log('error: ',err);
})