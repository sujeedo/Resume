
/* Home Banner */

const sliderContainer = document.querySelector('.banner_list_container'), // 슬라이드 아이템 컨테이너
      btnPrev = document.querySelector('.banner_prev_btn'), 
      btnNext = document.querySelector('.banner_next_btn'); 
      pagerContainer = document.querySelector('.paginaition');
      pagerBtns = document.querySelectorAll('.paginaition li'); 
let slides = document.querySelectorAll('.banner_list'), // 슬라이드 아이템
    slideCount = slides.length, // 슬라이드 갯수
    currentIndex = 0; // 현재 슬라이드
    timer = undefined;

// 슬라이드 이동 함수
function goToSlide(idx) {
  slides.forEach(slide => {
    slide.classList.remove('visible');
    slide.classList.remove('hidden');
  });
  // 부드러운 화면 전환을 위한 애니메이션을 추가합니다.
  slides[idx].classList.add('visible');
  if(idx == 0) {
    slides[2].classList.add('hidden');
  }
  if(idx == 1) {
    slides[0].classList.add('hidden');
  }
  if(idx == 2) {
    slides[1].classList.add('hidden');
  }
  // 현재 인덱스를 전달받은 파라미터 값으로 초기화합니다.
  currentIndex = idx;
  // 페이지네이션에 슬라이드 현재 위치를 표시합니다.
  pagerBtns.forEach(pagerBtn => {
    pagerBtn.classList.remove('active');
  });
  pagerBtns[idx].classList.add('active');
}
// 0을 파라미터로 전달하여 슬라이드 이동 함수를 호출합니다.
goToSlide(0);

// 이전 버튼 클릭시 슬라이드 이동 함수가 호출됩니다.
btnPrev.addEventListener('click', () => {
  if(currentIndex != 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(slideCount - 1);
  }
  pagePainting();
});
// 다음 버튼 클릭시 슬라이드 이동 함수가 호출됩니다.
btnNext.addEventListener('click', () => {
  if(currentIndex < slideCount - 1) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }
  pagePainting();
});
// 10초 간격 자동 슬라이드 함수
function startAutoSlide() {
  timer = setInterval(() => {
    let nextIndex = (currentIndex + 1) % slideCount; // 마지막번호에선 무조건 0번으로 이동
    goToSlide(nextIndex);
    pagePainting()
  }, 10000);
}
// 자동 슬라이드 함수를 즉시 호출합니다.
startAutoSlide();

// 페이지네이션 재생 애니메이션 함수
function pagePainting() {
let activePagerBtn = document.querySelector('.paginaition .active span');
activePagerBtn.animate([
  { width: '0%' },
  { width: '100%' }
], 10000);
}
// 페이지네이션 정지 애니메이션 함수
function pagePaintingStop() {
  let activePagerBtn = document.querySelector('.paginaition .active span');
  activePagerBtn.animate([
    { width: '100%' },
    { width: '100%' }
  ], 10000);
  }
// 페이지네이션바를 채우는 함수를 즉시 호출합니다.
pagePainting();

// 재생 버튼, 정지 버튼 요소 가져오기
const stopSlideBtn = document.querySelector('.banner_stop_btn');
const playSlideBtn = document.querySelector('.banner_play_btn');
// 정지 버튼을 누르면 자동 슬라이드가 정지됩니다.
stopSlideBtn.addEventListener('click', () => {
  clearInterval(timer);
  pagePaintingStop();
});
// 재생 버튼을 누르면 슬라이드가 자동 재생됩니다.
playSlideBtn.addEventListener('click', () => {
  startAutoSlide();
  pagePainting();
});

/* Home Project */
const projectPreviewSection = document.querySelector('.project'),
      projectPreviewLists = projectPreviewSection.querySelectorAll('.project_list');

function visibleIndexProject() {
  let scrollBottomValue = document.documentElement.scrollTop + window.innerHeight;
  let sectionTop = projectPreviewSection.offsetTop;
  let t = 0;
  if (sectionTop < scrollBottomValue) {
    for (let i = 0; i < projectPreviewLists.length; i++) {
      t += 300;
      setTimeout(function() { 
        projectPreviewLists[i].classList.add('visible');
      },t);
    }
    // setTimeout(function () {
    //   projectPreviewLists[1].classList.add('visible');
    // }, 300);
  }
}
window.addEventListener('scroll', throttle(visibleIndexProject, 300));
