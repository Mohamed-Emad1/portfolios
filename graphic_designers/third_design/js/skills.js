(function () {
  "use strict";

  const CIRCUMFERENCE = 2 * Math.PI * 50;

  function activateCircle(el) {
    const percent = parseInt(el.getAttribute("data-percent"), 10) || 0;
    const fill = el.querySelector(".fill");
    if (!fill) return;
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    fill.style.strokeDasharray = String(CIRCUMFERENCE);
    fill.style.strokeDashoffset = String(CIRCUMFERENCE);
    requestAnimationFrame(function () {
      fill.style.strokeDashoffset = String(offset);
    });
  }

  function activateBar(el) {
    const percent = parseInt(el.getAttribute("data-percent"), 10) || 0;
    requestAnimationFrame(function () {
      el.style.width = percent + "%";
    });
  }

  const circles = document.querySelectorAll(".progress-circle[data-percent]");
  const bars = document.querySelectorAll(".skill-bar__fill[data-percent]");

  if (!("IntersectionObserver" in window)) {
    circles.forEach(activateCircle);
    bars.forEach(activateBar);
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains("progress-circle")) {
          activateCircle(entry.target);
        } else {
          activateBar(entry.target);
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  circles.forEach(function (el) { observer.observe(el); });
  bars.forEach(function (el) { observer.observe(el); });
})();
