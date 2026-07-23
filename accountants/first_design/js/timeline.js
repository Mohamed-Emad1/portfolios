(function () {
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          const dot = entry.target.querySelector(".timeline-item__dot");
          if (dot) dot.classList.add("pulse-glow");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  timelineItems.forEach((item) => observer.observe(item));
})();
