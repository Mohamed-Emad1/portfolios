(function () {
  let counters = Array.from(document.querySelectorAll('.counter-num[data-counter]'));
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  function trigger(el) {
    el.classList.add('is-counted');
    animateCounter(el);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(trigger);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('is-counted')) {
          trigger(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));

  function checkPending() {
    const vh = window.innerHeight;

    for (let i = counters.length - 1; i >= 0; i -= 1) {
      const el = counters[i];
      if (el.classList.contains('is-counted')) {
        counters.splice(i, 1);
        continue;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < vh - vh * 0.1 && rect.bottom > 0) {
        trigger(el);
        observer.unobserve(el);
        counters.splice(i, 1);
      }
    }

    if (!counters.length) {
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

  checkPending();
  const pollTimer = setInterval(checkPending, 700);
})();
