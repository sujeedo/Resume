const sliderContainer = document.querySelector('.banner_list_container'), // 슬라이드 아이템 컨테이너
      btnPrev = document.querySelector('.banner_prev_btn'), 
      btnNext = document.querySelector('.banner_next_btn'); 
      pagerContainer = document.querySelector('.paginaition');
      pagerBtns = document.querySelectorAll('.paginaition li'); 
let slides = document.querySelectorAll('.banner_list'), // 슬라이드 아이템
    slideCount = slides.length, // 슬라이드 갯수
    currentIndex = 0; // 현재 슬라이드
    timer = undefined,
    pagerHTML = '';

// 슬라이드 이동 함수
function goToSlide(idx) {
  slides.forEach(slide => {
    slide.classList.remove('visible');
    slide.classList.remove('hidden');
  });
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

  currentIndex = idx;

  pagerBtns.forEach(pagerBtn => {
    pagerBtn.classList.remove('active');
  });
  pagerBtns[idx].classList.add('active');
}
goToSlide(0);

// 버튼을 클릭시 슬라이드 이동
btnPrev.addEventListener('click', () => {
  if(currentIndex != 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(slideCount - 1);
  }
  pagePainting();
});
btnNext.addEventListener('click', () => {
  if(currentIndex < slideCount - 1) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }
  pagePainting();
});

// 자동 슬라이드
function startAutoSlide() {
  timer = setInterval(() => {
    let nextIndex = (currentIndex + 1) % slideCount;
    goToSlide(nextIndex);
    pagePainting()
  }, 10000);
}
startAutoSlide();
pagePainting();

// 페이지네이션 애니메이션
function pagePainting() {
let activePagerBtn = document.querySelector('.paginaition .active span');
activePagerBtn.animate([
  { width: '0%' },
  { width: '100%' }
], 10000);
}

function pagePaintingStop() {
  let activePagerBtn = document.querySelector('.paginaition .active span');
  activePagerBtn.animate([
    { width: '100%' },
    { width: '100%' }
  ], 10000);
  }

const stopSlideBtn = document.querySelector('.banner_stop_btn');
const playSlideBtn = document.querySelector('.banner_play_btn');
stopSlideBtn.addEventListener('click', () => {
  clearInterval(timer);
  pagePaintingStop();
});
playSlideBtn.addEventListener('click', () => {
  startAutoSlide();
  pagePainting();
});

pagerBtns.forEach(pagerBtn => {
  pagerBtn.addEventListener('click', (event) => {
    let pagerNum = event.target.dataset.index;
    goToSlide(pagerNum);
  });
});

