document.addEventListener('click', function(e) {
  const x = e.pageX;
  const y = e.pageY - window.scrollY;
  createHeart(x, y);
});

function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty('--color', getRandomColor());

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}