const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for(let i = 0; i<=10000000;i++){
    file.write('안녕하세요. 엄청나게 큰 파일을 만들어 볼 것입니다.');
}//1기가 정도 만들어짐

file.end();