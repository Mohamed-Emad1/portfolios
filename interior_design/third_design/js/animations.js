/* Scroll reveal, counter animation, hero parallax, mouse-follow glow */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Scroll reveal --- */
  const animatedEls = document.querySelectorAll("[data-animate]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    animatedEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animatedEls.forEach((el) => revealObserver.observe(el));
  }

  /* --- Counter animation --- */
  const counters = document.querySelectorAll("[data-counter]");
  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* --- Hero parallax --- */
  const heroParallax = document.getElementById("hero-parallax");
  if (heroParallax && !reduceMotion) {
    const img = heroParallax.querySelector("img");
    let ticking = false;

    function updateParallax() {
      const offset = Math.min(window.scrollY * 0.25, 160);
      img.style.transform = `translateY(${offset}px) scale(1.08)`;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateParallax();
  }

  /* --- Mouse-follow glow --- */
  document.querySelectorAll(".glow-surface").forEach((surface) => {
    surface.addEventListener("mousemove", (e) => {
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
      surface.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    });
  });
})();
