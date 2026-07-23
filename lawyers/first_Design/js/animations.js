(function () {
  const animatedEls = Array.from(document.querySelectorAll('[data-animate]'));
  const revealEls = Array.from(document.querySelectorAll('.img-reveal'));
  const allEls = animatedEls.concat(revealEls);

  if (!allEls.length) return;

  if (!('IntersectionObserver' in window)) {
    allEls.forEach((el) => el.classList.add('in-view'));
    return;
  }

  function reveal(el) {
    el.classList.add('in-view');
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  allEls.forEach((el) => observer.observe(el));

  /* Redundant scroll-driven fallback: some environments delay or throttle
     IntersectionObserver callbacks. Manually check pending elements so
     content never remains permanently invisible. */
  function checkPending() {
    const vh = window.innerHeight;

    for (let i = allEls.length - 1; i >= 0; i -= 1) {
      const el = allEls[i];
      if (el.classList.contains('in-view')) {
        allEls.splice(i, 1);
        continue;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < vh - vh * 0.1 && rect.bottom > 0) {
        reveal(el);
        observer.unobserve(el);
        allEls.splice(i, 1);
      }
    }

    if (!allEls.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearInterval(pollTimer);
    }
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const onScroll = debounce(checkPending, 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* Initial pass for above-the-fold content. */
  checkPending();

  /* Safety poll in case neither IO nor scroll events fire promptly. */
  const pollTimer = setInterval(checkPending, 700);
})();
