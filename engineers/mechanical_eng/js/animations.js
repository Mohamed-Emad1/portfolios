export function init() {
  const items = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  if (!items.length) return;

  const groups = new Map();
  items.forEach((el) => {
    const parent = el.parentElement;
    const index = groups.has(parent) ? groups.get(parent) : 0;
    groups.set(parent, index + 1);
    el.style.setProperty('--delay', `${Math.min(index * 0.08, 0.4)}s`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach((el) => observer.observe(el));
}
