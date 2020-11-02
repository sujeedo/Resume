String.prototype.toKorChars = function () {
  let cCho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
    cJung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
    cJong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'], cho, jung, jong;
  let str = this,
    cnt = str.length,
    chars = [],
    cCode;
  for (let i = 0; i < cnt; i++) {
    cCode = str.charCodeAt(i);
    if (cCode == 32) {
      chars.push(' ');
      continue;
    } 
    // 한글이 아닌 경우 
    if (cCode < 0xAC00 || cCode > 0xD7A3) {
      chars.push(str.charAt(i)); 
      continue;
    }
    cCode = str.charCodeAt(i) - 0xAC00;
    jong = cCode % 28; // 종성 
    jung = ((cCode - jong) / 28) % 21 // 중성 
    cho = (((cCode - jong) / 28) - jung) / 21 // 초성 
    //기본 코드 테스트가 ㅌㅔㅅ-ㅌ- 형식으로 저장됨 
    // chars.push(cCho[cho], cJung[jung]); 
    // if (cJong[jong] !== '') { 
    //     chars.push(cJong[jong]); 
    //     } 
    //  테스트라는 문장이 있으면 ㅌ테ㅅ스ㅌ트 형식으로 저장되도록함 (타이핑을 위해서)
    chars.push(cCho[cho]);
    chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28)));
    if (cJong[jong] !== '') {
      chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28) + jong));
    }
  }
  return chars;
}


// 타이핑 할 텍스트를 지정합니다.
let text1  = '"안녕하세요.';
let text2  = '웹 퍼블리셔 김경미입니다."';
let typeing1 = [], typeing2 = [];
text1 = text1.split(''); // ['안'.'녕','하','세','요','.']; 한글자씩 잘라줍니다.
text2 = text2.split(''); 

// 각 글자를 초성,중성,종성으로 나눠줍니다.
// typeing1 = [ ['0','아','안'], ['ㄴ','녀','녕']... ];
for(let i = 0; i < text1.length; i++) {
  typeing1[i] = text1[i].toKorChars();
}
for(let i = 0; i < text2.length; i++) {
  typeing2[i] = text2[i].toKorChars();
}

// 텍스트가 타이핑되어 출력될 요소를 가져옵니다.
const textBox1 = document.querySelector('.greeting_text1');
const textBox2 = document.querySelector('.greeting_text2');

//
let text = '';
let i=0; 
let j=0; 
let imax1 = typeing1.length; // 6개
let imax2 = typeing2.length; // 14개

// setInterval 함수를 이용해 반복적으로 출력합니다.
let inter = setInterval(typingAction1, 150);
let inter2;

function typingAction1() {
  // 텍스트가 들어있는 컨테이너에 깜빡이는 키보드 커서를 추가합니다.
  textBox1.classList.add('cursor'); 
  // 만약, i가 타이핑할 문장의 길이보다 작거나 같다면 코드를 실행합니다. (0 <= 6-1);
  // 글자 수 만큼만 반복하고 종료합니다. imax1 => 0번 3번, 1번 3번, 3번 2번, 4번, 2번, 5번 2번, 6번 1번 총 13번 반복
  if (i <= imax1 - 1) {
    //console.log(imax1)
    // 각 글자를 초성 중성 종성 순서대로 추가합니다.
    // jmax1 => ['ㅇ','아','안'] 3번 출력 ['ㄴ','녀','녕'] 3번 출력 ['ㅎ''하'] 2번 출력 [ㅅ'','세'] 2번 출력 ['ㅇ','요'] 2번 출력 ['.'] 1번 출력
    let jmax1 = typeing1[i].length; // typeing1[0] = 3 = ['0','아','안'];
    textBox1.innerText = text + typeing1[i][j]; // 2차원 배열 : 배열이름[열의길이][행의길이] typeing1[0][0];
    j++;
    // j가 타이핑 배열의 길이와 같다면 (3 == 3);
    if (j == jmax1) {
      text += typeing1[i][j - 1]; //초성 중성 종성 순서대로 출력된 글자를 다음 글자와 이어 붙이기 위해 저장합니다.
      i++;
      j = 0;
    }
  // i가 타이핑할 문장의 길이보다 크다면 현재 타이핑을 멈추고 다음 타이핑을 시작합니다.
  } 
  else {
    clearInterval(inter);
    text = '';
    i = 0;
    j = 0;
    setTimeout(function () {
      textBox1.classList.remove('cursor');
      setTimeout(function () {
        textBox2.classList.add('cursor');
        setTimeout(function () {
          inter2 = setInterval(typingAction2, 150);
        }, 400);
      }, 300);
    }, 400);
  }
}

function typingAction2() {
  if (i <= imax2 - 1) {
    let jmax2 = typeing2[i].length;
    textBox2.innerText = text + typeing2[i][j];
    j++;
    if (j == jmax2) {
      text += typeing2[i][j - 1];
      i++;
      j = 0;
    }
  } else {
    clearInterval(inter);
  }
}
