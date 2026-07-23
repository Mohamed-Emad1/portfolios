(function () {
  const kpiCards = document.querySelectorAll(".kpi-card");
  if (!kpiCards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 60}ms`;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  kpiCards.forEach((card) => observer.observe(card));
})();
