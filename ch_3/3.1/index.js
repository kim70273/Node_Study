const {odd, even} = require('./var');
const checkNumber = require('./func');
const checkOddOrEven = require('./func');

function checkStringOddOrEven(str){
    if(str.length %2){
        return odd;
    }else{
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
//파일들을 잘게잘게 쪼개서 공통이 되는부분을 모듈로 만들어줌 var.js