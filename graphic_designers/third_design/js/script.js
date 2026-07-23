(function () {
  "use strict";

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    const head = item.querySelector(".accordion-item__head");
    const panel = item.querySelector(".accordion-item__panel");
    if (!head || !panel) return;

    if (item.classList.contains("is-open")) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

    head.addEventListener("click", function () {
      const isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".accordion-item.is-open").forEach(function (open) {
        if (open !== item) {
          open.classList.remove("is-open");
          open.querySelector(".accordion-item__head").setAttribute("aria-expanded", "false");
          open.querySelector(".accordion-item__panel").style.maxHeight = null;
        }
      });

      item.classList.toggle("is-open", !isOpen);
      head.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  // ==========================================================================
  // Testimonials Slider
  // ==========================================================================
  const track = document.getElementById("testimonialsTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (track && dotsWrap) {
    const slides = Array.from(track.children);
    let index = 0;
    let autoTimer = null;

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "الانتقال للشهادة " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      dots.forEach(function (d, di) { d.classList.toggle("is-active", di === index); });
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 6000);
    }
    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); startAuto(); });

    track.parentElement.addEventListener("mouseenter", stopAuto);
    track.parentElement.addEventListener("mouseleave", startAuto);

    let touchStartX = 0;
    track.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAuto();
    }, { passive: true });

    track.addEventListener("touchend", function (e) {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) prev();
        else next();
      }
      startAuto();
    }, { passive: true });

    goTo(0);
    startAuto();
  }
})();
