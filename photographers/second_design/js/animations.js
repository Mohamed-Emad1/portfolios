/* Intersection Observer scroll reveals, hero parallax, mouse glow, button ripple */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll reveal */
  const animatedEls = document.querySelectorAll("[data-animate]");

  if (reduceMotion) {
    animatedEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    animatedEls.forEach((el) => observer.observe(el));
  } else {
    animatedEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Hero parallax */
  const heroParallax = document.getElementById("heroParallax");
  if (heroParallax && !reduceMotion) {
    const img = heroParallax.querySelector("img");
    let latestY = 0;
    let ticking = false;

    function updateParallax() {
      const offset = Math.min(latestY * 0.35, 200);
      img.style.transform = `translateY(${offset}px) scale(1.08)`;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      latestY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  /* Mouse glow follower (desktop only) */
  const glow = document.querySelector(".mouse-glow");
  const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (glow && !isCoarsePointer && !reduceMotion) {
    window.addEventListener("mousemove", (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* Button ripple effect */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add("ripple");
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  /* Smooth scroll for in-page anchors (accounts for fixed navbar) */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
