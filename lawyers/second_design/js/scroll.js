function initScroll() {
  const scrollBtn = document.querySelector('.hero-scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const target = document.querySelector(scrollBtn.dataset.target || '#about');
      target && target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      lastY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.body.classList.toggle('is-scrolled-past', lastY > 10);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}
