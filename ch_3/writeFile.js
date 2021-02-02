const fs = require('fs').promises;

fs.writeFile('./writeme.txt','글이 입력됩니다.')//파일을 작성
.then(()=>{
    return fs.readFile('./writeme.txt');
})
.then((data)=>{//바로 읽음
    console.log(data.toString());//프로미스로 them을 연달아서 가능
})
.catch((err)=>{
    console.error(err);
});