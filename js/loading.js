const loadingBox = document.querySelector('.loading'),
      leftLeyer = loadingBox.querySelector('.loading .left'),
      rightLeyer = loadingBox.querySelector('.loading .right'),
      favicon = loadingBox.querySelector('img'),
      logo = loadingBox.querySelector('.loading_item');

      console.log(favicon)

window.addEventListener('load', () => {
  leftLeyer.classList.add('hidden_ani_left');
  rightLeyer.classList.add('hidden_ani_right');
  favicon.classList.add('hedden_opacity');
  logo.classList.add('hedden_opacity');
  setTimeout(function() {
    loadingBox.style.display = 'none';
  }, 1000);
});