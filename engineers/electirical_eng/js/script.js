/* Coordinates testimonial slider, smooth-scroll nav links, and PCB trace reveal.
   Feature modules (navbar, circuits, dashboard, projects, charts, animations,
   counters, particles, cursor, timeline, contact) self-initialize on load. */
(function () {
  /* ---------------- Smooth scroll for in-page nav ---------------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.getElementById("siteHeader").offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ---------------- Testimonials slider ---------------- */
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (track) {
    const slides = track.children.length;
    let index = 0;
    const isRTL = document.documentElement.dir === "rtl";

    for (let i = 0; i < slides; i++) {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `الشهادة ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }

    function update() {
      const shift = index * 100 * (isRTL ? 1 : -1);
      track.style.transform = `translateX(${shift}%)`;
      [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    }

    function goTo(i) {
      index = (i + slides) % slides;
      update();
    }

    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));

    let autoplay = setInterval(() => goTo(index + 1), 6000);
    const slider = track.closest(".testimonial-slider");
    slider.addEventListener("mouseenter", () => clearInterval(autoplay));
    slider.addEventListener("mouseleave", () => (autoplay = setInterval(() => goTo(index + 1), 6000)));

    /* Swipe support */
    let touchStartX = 0;
    track.addEventListener("touchstart", (e) => (touchStartX = e.touches[0].clientX), { passive: true });
    track.addEventListener(
      "touchend",
      (e) => {
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) < 40) return;
        const forward = isRTL ? delta > 0 : delta < 0;
        goTo(forward ? index + 1 : index - 1);
      },
      { passive: true }
    );
  }

  /* ---------------- PCB trace draw-in reveal ---------------- */
  const traces = document.querySelectorAll(".circuit-trace--glow");
  if (traces.length && "IntersectionObserver" in window) {
    const traceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            traceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    traces.forEach((trace) => traceObserver.observe(trace));
  }
})();
