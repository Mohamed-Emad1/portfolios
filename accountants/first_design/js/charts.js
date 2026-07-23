(function () {
  const chartCards = document.querySelectorAll(".chart-card");
  if (!chartCards.length) return;

  const CIRCUMFERENCE = 2 * Math.PI * 50;

  function buildPieChart(card) {
    const circles = card.querySelectorAll(".chart-pie circle");
    if (!circles.length) return;

    let offsetAccum = 0;
    circles.forEach((circle) => {
      const value = parseFloat(circle.getAttribute("data-value")) || 0;
      const length = (value / 100) * CIRCUMFERENCE;
      circle.style.strokeDasharray = `${length} ${CIRCUMFERENCE - length}`;
      circle.style.strokeDashoffset = String(-offsetAccum);
      offsetAccum += length;
    });
  }

  chartCards.forEach((card) => {
    if (card.querySelector(".chart-pie")) {
      buildPieChart(card);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  chartCards.forEach((card) => observer.observe(card));
})();
