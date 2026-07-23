(function () {
  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in-view"), i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    items.forEach((el) => observer.observe(el));
  } else {
    items.forEach((el) => el.classList.add("in-view"));
  }
})();
