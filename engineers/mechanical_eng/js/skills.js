export function init() {
  const cards = document.querySelectorAll('.skill-card');
  if (!cards.length) return;

  const animatePercent = (el, target) => {
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}%`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const fill = card.querySelector('.skill-bar-fill');
      const percentEl = card.querySelector('.skill-percent');
      const target = parseInt(fill.dataset.target, 10) || 0;

      requestAnimationFrame(() => {
        fill.style.width = `${target}%`;
      });
      animatePercent(percentEl, target);
      observer.unobserve(card);
    });
  }, { threshold: 0.3 });

  cards.forEach((card) => observer.observe(card));
}
