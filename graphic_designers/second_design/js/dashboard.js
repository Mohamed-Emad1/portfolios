(function () {
  const widgets = document.querySelectorAll(".dashboard-widget");
  const miniBars = document.querySelectorAll(".mini-bars span");

  if ("IntersectionObserver" in window && miniBars.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.style.transition = "height 1s cubic-bezier(.22,1,.36,1)";
              entry.target.style.height = `${entry.target.dataset.height}%`;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    miniBars.forEach((bar) => observer.observe(bar));
  }

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) return;

  widgets.forEach((widget) => {
    widget.addEventListener("mousemove", (e) => {
      const rect = widget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      widget.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    widget.addEventListener("mouseleave", () => {
      widget.style.transform = "";
    });
  });
})();
