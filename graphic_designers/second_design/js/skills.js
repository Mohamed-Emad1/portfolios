(function () {
  const bars = document.querySelectorAll(".skill-bar-item");
  const circles = document.querySelectorAll(".progress-circle");
  const RING_CIRCUMFERENCE = 2 * Math.PI * 54;

  function animateBar(el) {
    const value = el.dataset.skill;
    const fill = el.querySelector(".skill-bar-fill");
    requestAnimationFrame(() => {
      fill.style.width = `${value}%`;
    });
  }

  function animateCircle(el) {
    const value = parseInt(el.dataset.progress, 10);
    const ring = el.querySelector(".fg-ring");
    const valueLabel = el.querySelector(".progress-value");
    const offset = RING_CIRCUMFERENCE - (value / 100) * RING_CIRCUMFERENCE;

    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = offset;
    });

    const duration = 1500;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      valueLabel.textContent = `${Math.round(progress * value)}%`;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("skill-bar-item")) animateBar(entry.target);
            else animateCircle(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((el) => observer.observe(el));
    circles.forEach((el) => observer.observe(el));
  } else {
    bars.forEach(animateBar);
    circles.forEach(animateCircle);
  }
})();
