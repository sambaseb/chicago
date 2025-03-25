let lastTouchEnd = 0;

document.addEventListener('touchend', function (event) {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // Block double-tap zoom
  }
  lastTouchEnd = now;
}, false);