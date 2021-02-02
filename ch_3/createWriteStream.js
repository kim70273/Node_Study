const fs = require('fs');

const writeSteam = fs.createWriteStream('./writeme2.txt');
writeSteam.on('finish', ()=>{
    console.log('파일 쓰기 완료');
})

writeSteam.write('이 글을 씁니다.\n');//write하나가 하나의 버퍼가 됨
writeSteam.write('한 번 더 씁니다.');
//read랑 연결 가능
writeSteam.end();//완료가 됨