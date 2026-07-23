(function () {
  const skillBars = document.querySelectorAll(".skill-bar[data-percent]");
  const progressCircles = document.querySelectorAll(".progress-circle[data-percent]");

  if (!skillBars.length && !progressCircles.length) return;

  const RADIUS = 50;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  progressCircles.forEach((el) => {
    const indicator = el.querySelector(".indicator");
    if (indicator) {
      indicator.style.strokeDasharray = String(CIRCUMFERENCE);
      indicator.style.strokeDashoffset = String(CIRCUMFERENCE);
    }
  });

  function animateSkillBar(el) {
    const percent = parseFloat(el.getAttribute("data-percent")) || 0;
    const fill = el.querySelector(".skill-bar__fill");
    if (fill) requestAnimationFrame(() => (fill.style.width = `${percent}%`));
  }

  function animateProgressCircle(el) {
    const percent = parseFloat(el.getAttribute("data-percent")) || 0;
    const indicator = el.querySelector(".indicator");
    if (!indicator) return;
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    requestAnimationFrame(() => (indicator.style.strokeDashoffset = String(offset)));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains("skill-bar")) {
          animateSkillBar(entry.target);
        } else {
          animateProgressCircle(entry.target);
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((el) => observer.observe(el));
  progressCircles.forEach((el) => observer.observe(el));
})();
