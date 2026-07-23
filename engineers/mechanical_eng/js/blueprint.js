export function init() {
  const paths = document.querySelectorAll('.draw-path');
  const grids = document.querySelectorAll('.blueprint-grid');

  if (paths.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    paths.forEach((p) => observer.observe(p));
  }

  if (grids.length) {
    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    grids.forEach((g) => gridObserver.observe(g));
  }
}
