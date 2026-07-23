(function () {
  "use strict";

  const isTouch = window.matchMedia("(hover: none)").matches || window.innerWidth < 992;
  if (isTouch) return;

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
  });

  function raf() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%,-50%)";
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const interactive = "a, button, .portfolio-item, .card, .service-card, input, textarea, select, .filter-btn";
  document.querySelectorAll(interactive).forEach(function (el) {
    el.addEventListener("mouseenter", function () { ring.classList.add("is-active"); });
    el.addEventListener("mouseleave", function () { ring.classList.remove("is-active"); });
  });

  document.addEventListener("mouseleave", function () {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function () {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();
