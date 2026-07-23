(function () {
  let items = Array.from(document.querySelectorAll('.timeline-item'));
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  items.forEach((el) => observer.observe(el));

  function checkPending() {
    const vh = window.innerHeight;

    for (let i = items.length - 1; i >= 0; i -= 1) {
      const el = items[i];
      if (el.classList.contains('in-view')) {
        items.splice(i, 1);
        continue;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < vh - vh * 0.1 && rect.bottom > 0) {
        el.classList.add('in-view');
        observer.unobserve(el);
        items.splice(i, 1);
      }
    }

    if (!items.length) {
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
