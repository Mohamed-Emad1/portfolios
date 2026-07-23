export function init() {
  const steps = document.querySelectorAll('.workflow-step, .exp-item');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  steps.forEach((step, i) => {
    step.style.transitionDelay = `${Math.min(i * 0.1, 0.6)}s`;
    step.classList.add('fade-up');
    observer.observe(step);
  });
}
