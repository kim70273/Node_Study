const {odd, even} = require('./var');
//var.js를 불러온다.
//구조분해 할당
//객체가 넘어 온다.

function checkOddOrEven(number){
    if(number%2){
        return odd;
    }else{
        return even;
    }
}

//다른곳에서 가져온것 사용한것도 다시 내보낼 수 있다.

module.exports = checkOddOrEven;
//module.exports는 딱 한번만 써야한다.
