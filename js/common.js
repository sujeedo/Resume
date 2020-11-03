/* 로딩 애니메이션 */
const loadingBox = document.querySelector('.loading'),
      leftLeyer = loadingBox.querySelector('.loading .left'),
      rightLeyer = loadingBox.querySelector('.loading .right'),
      favicon = loadingBox.querySelector('img'),
      logo = loadingBox.querySelector('.loading_item');

window.addEventListener('load', () => {
  leftLeyer.classList.add('hidden_ani_left');
  rightLeyer.classList.add('hidden_ani_right');
  favicon.classList.add('hedden_opacity');
  logo.classList.add('hedden_opacity');
  setTimeout(function() {
    loadingBox.style.display = 'none';
  }, 1000);
});

/* 푸터 표시 애니메이션 */
const footer = document.querySelector('footer');
function vislbleFooter() {
  let scrollValue = document.documentElement.scrollTop + window.innerHeight;
  let footetTop = footer.offsetTop + footer.clientHeight/2;
  if (footetTop < scrollValue) {
    setTimeout(function(){
      footer.classList.add('visible');
    }, 200)
  } else {
    footer.classList.remove('visible');
  }
}
window.addEventListener('scroll', throttle(vislbleFooter, 300));

/* 함수를 간격을 두고 호출하는 함수 */
function throttle(fn, delay) {
  let timer
  return function() {
      if (!timer){
          timer = setTimeout(() => {
              timer = null
              fn.apply(this, arguments)
          }, delay)
      }
  }
}
