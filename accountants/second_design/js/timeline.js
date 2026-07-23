/* Pulses each timeline milestone dot as it scrolls into view (fade-in itself
   is handled by the generic [data-animate] observer in animations.js) */
const Timeline = (() => {
  function init() {
    const dots = document.querySelectorAll('.timeline-dot');
    if (!dots.length) return;

    if (!('IntersectionObserver' in window)) {
      dots.forEach((dot) => dot.classList.add('glow'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('glow');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .6 });

    dots.forEach((dot) => observer.observe(dot));
  }

  return { init };
})();
