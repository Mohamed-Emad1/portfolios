(function () {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  let index = 0;
  let autoTimer;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${index * 100}%)`;
    dots.forEach((dot, di) => dot.classList.toggle('active', di === index));
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 6000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  /* Swipe support */
  let startX = 0;
  let deltaX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    deltaX = e.touches[0].clientX - startX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 50) {
      /* RTL: swipe right (positive delta) shows previous */
      if (deltaX > 0) prev(); else next();
    }
    deltaX = 0;
    startAuto();
  });

  goTo(0);
  startAuto();
})();
