function initTestimonials() {
  const track = document.querySelector('.testimonial-slides');
  if (!track) return;

  const slides = track.children.length;
  const dotsWrap = document.querySelector('.testimonial-dots');
  const prevBtn = document.querySelector('[data-testimonial-prev]');
  const nextBtn = document.querySelector('[data-testimonial-next]');
  let current = 0;
  let autoTimer;

  const dots = [];
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < slides; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `الانتقال إلى رأي رقم ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }
  }

  function render() {
    track.style.transform = `translateX(${current * -100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  function goTo(index) {
    current = (index + slides) % slides;
    render();
    restartAuto();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 6000);
  }

  nextBtn && nextBtn.addEventListener('click', next);
  prevBtn && prevBtn.addEventListener('click', prev);

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
  }, { passive: true });

  render();
  restartAuto();
}
