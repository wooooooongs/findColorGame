// 배열에 문제 추가
const color = [
  '#EE4A5D', '#FF66CC', '#FFFF66' ,'#AFCB3D', '#33CCFF', '#FF6633', '#6633FF'
]

const text = [
  '빨간색', '핑크색', '노란색', '초록색', '파란색', '주황색', '보라색'
]

// 변수 설정
const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
const forth = document.getElementById('forth');
const result = document.getElementById('result');
const container = document.getElementById('container');
const items = document.querySelectorAll('.item');
const start = document.getElementById('start');
let score = 0;


function randomText(array) {
  let rdText = Math.floor(Math.random() * array.length);
  return array[rdText];
}

function randomColor(array) {
  let rdColor = Math.floor(Math.random() * array.length);
  return array[rdColor];
}

function 정답항목(){
  const current = randomText(text); // 랜덤한 text
  const index = text.indexOf(current); // 랜덤한 text의 index값
  first.textContent = current;
  first.style.backgroundColor=color[index];
}

function 정답클릭시(){
  score += 5;
  result.value = score;
}

function 오답항목(q) {
  let setColor = randomColor(color);
  let setText = randomText(text);
  let wrongColor = color.indexOf(setColor);
  let wrongText = text.indexOf(setText);


  // 오류 검토
  var i = 0;

  while(i<1){ 
    // 오류 검토 1. 랜덤으로 찾은 color, text값의 index를 비교함
    if(wrongColor != wrongText){
      q.style.backgroundColor = setColor;
      q.textContent = setText;
      i++;
    } else {
      // 오류 검토 2. 일치하다면 오류 발생. 처음부터 다시
      console.log('correct');
      setColor = randomColor(color);
      setText = randomText(text);
      q.style.backgroundColor = setColor;
      q.textContent = setText;
      break;
    }
  }
}

function 순서섞기() {
  for(var i=0; i<items.length; i++){
    let item1 = Math.floor(Math.random() * items.length);
    let item2 = Math.floor(Math.random() * items.length);
    container.insertBefore(items[item1], items[item2]);
  }
}

// 다음 문제 출제 시 실행 될 함수
function 다음문제() {
  정답항목();
  오답항목(second);
  오답항목(third);
  오답항목(forth);
  순서섞기();
}

// 시작하기! 버튼 클릭
function getStart() {
  // 점수 초기화
  result.value = 0;
  score = 0;
  // 시작하기! 버튼 사라지게
  start.style.display = 'none';
  다음문제();
  시간재기();
}

// 초 
function 시간재기(){
  const remainTime = document.getElementById('remain');
  const lastScore = document.getElementById('lastScore');
  let counter = 30;

  const interval = setInterval(() => {
    if(counter == 0){
      clearInterval(interval);
      start.style.display = 'flex';
      remainTime.textContent = '시간 종료!'
      lastScore.textContent = '이전 점수: ' + score;
    } else {
      counter -= 1;
      remainTime.textContent = counter + '초 남았습니다!';
    }
  }, 1000)
}
