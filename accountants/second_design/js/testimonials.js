/* Auto-advancing testimonial slider with manual nav + touch swipe support */
const Testimonials = (() => {
  let track, slides, dotsWrap, prevBtn, nextBtn;
  let index = 0;
  let timer;
  const AUTOPLAY_MS = 6000;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    const step = 100 / slides.length;
    track.style.transform = `translateX(${index * step}%)`;
    dotsWrap.querySelectorAll('.slider-dot').forEach((dot, di) => dot.classList.toggle('active', di === index));
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `الشريحة ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); restartAutoplay(); });
      dotsWrap.appendChild(dot);
    });
  }

  function initSwipe() {
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? prev() : next();
        restartAutoplay();
      }
    }, { passive: true });
  }

  function init() {
    track = document.getElementById('testimonialTrack');
    if (!track) return;
    slides = track.querySelectorAll('.testimonial-slide');
    dotsWrap = document.getElementById('sliderDots');
    prevBtn = document.getElementById('sliderPrev');
    nextBtn = document.getElementById('sliderNext');

    track.style.width = `${slides.length * 100}%`;
    slides.forEach((s) => { s.style.width = `${100 / slides.length}%`; });

    buildDots();
    goTo(0);

    prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
    nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
    initSwipe();
    restartAutoplay();

    track.closest('.testimonial-slider').addEventListener('mouseenter', () => clearInterval(timer));
    track.closest('.testimonial-slider').addEventListener('mouseleave', restartAutoplay);
  }

  return { init };
})();
