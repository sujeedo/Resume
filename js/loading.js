const loadingBox = document.querySelector('.loading');

window.addEventListener('load', () => {
  loadingBox.animate([{opacity: '1'}, {opacity: '0'}], 500)
  setTimeout(function() {
    loadingBox.style.display = 'none';
  }, 500);
});