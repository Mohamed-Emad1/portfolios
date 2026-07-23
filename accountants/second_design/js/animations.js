/* Generic scroll-reveal for [data-animate] elements, plus skill bars and
   circular progress indicators. Respects prefers-reduced-motion. */
const Animations = (() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 52;

  function revealScrollElements() {
    const targets = document.querySelectorAll('[data-animate]');
    if (!targets.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .15 });

    targets.forEach((el) => observer.observe(el));
  }

  function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    const run = (el) => { el.style.width = `${el.dataset.skill}%`; };

    if (reduceMotion || !('IntersectionObserver' in window)) {
      bars.forEach(run);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .4 });

    bars.forEach((el) => observer.observe(el));
  }

  function animateProgressCircles() {
    const circles = document.querySelectorAll('.progress-circle');
    if (!circles.length) return;

    const run = (wrap) => {
      const percent = parseFloat(wrap.dataset.progress);
      const fill = wrap.querySelector('.fill');
      const offset = CIRCLE_CIRCUMFERENCE - (percent / 100) * CIRCLE_CIRCUMFERENCE;
      fill.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
      fill.style.strokeDashoffset = offset;
    };

    if (reduceMotion || !('IntersectionObserver' in window)) {
      circles.forEach(run);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .4 });

    circles.forEach((el) => observer.observe(el));
  }

  function init() {
    revealScrollElements();
    animateSkillBars();
    animateProgressCircles();
  }

  return { init };
})();
