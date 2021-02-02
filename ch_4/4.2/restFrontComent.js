async function getComent() { // 로딩 시 코멘트 가져오는 함수
    try {
      const res = await axios.get('/coments');
      const coments = res.data;
      const list = document.getElementById('coment-list');
      list.innerHTML = '';
      // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
      Object.keys(coments).map(function (key) {
        const userDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = coments[key];
        userDiv.appendChild(span);
        list.appendChild(userDiv);
        console.log(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  window.onload = getComent; // 화면 로딩 시 getUser 호출
  // 폼 제출(submit) 시 실행
  document.getElementById('form2').addEventListener('submit', async (e) => {
    e.preventDefault();
    const coment = e.target.coment.value;
    if (!coment) {
      return alert('코멘트를 입력하세요');
    }
    try {
      await axios.post('/coment', { coment });
      //값을 post로 보냄
      //서버에 post /user가 있어야됨
      //post는 데이터를 같이 보내야 한다.
      getComent();
    } catch (err) {
      console.error(err);
    }
    e.target.coment.value = '';
  });