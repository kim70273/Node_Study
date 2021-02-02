const buffer = Buffer.from('저를 버퍼로 바꿔보세요.');
//버퍼의 형식은 0,1을 16진법으로 나타냄
console.log('from:',buffer);
console.log('length:',buffer.length);//32라면 32바이트
console.log('toString():',buffer.toString());
//다시 문자열로 나타남.

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
//스트리밍 할때 이런게 조각 조각 난다.
const buffer2 = Buffer.concat(array);
//여러개를 합침
console.log('concat():',buffer2.toString());

const buffer3 = Buffer.alloc(5);//5바이트 빈 공간 할당
console.log('alloc:',buffer3);

//readFile의 경우 버퍼의 크기랑 파일크기 똑같아서 한번에 읽은것.