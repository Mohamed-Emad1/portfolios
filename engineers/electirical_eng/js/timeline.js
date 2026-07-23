(function () {
  const items = document.querySelectorAll("[data-animate-timeline]");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((item) => observer.observe(item));

  // Skill bars + progress circles share the same reveal-on-scroll pattern
  const skillFills = document.querySelectorAll(".skill-bar__fill");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.skill + "%";
          skillObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillFills.forEach((el) => skillObserver.observe(el));

  const circles = document.querySelectorAll(".progress-circle");
  const circleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const pct = parseFloat(el.dataset.progress || "0");
          const circle = el.querySelector(".fill");
          const radius = 52;
          const circumference = 2 * Math.PI * radius;
          circle.style.strokeDasharray = `${circumference}`;
          circle.style.strokeDashoffset = `${circumference}`;
          requestAnimationFrame(() => {
            circle.style.strokeDashoffset = `${circumference * (1 - pct / 100)}`;
          });
          circleObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );
  circles.forEach((el) => circleObserver.observe(el));
})();
