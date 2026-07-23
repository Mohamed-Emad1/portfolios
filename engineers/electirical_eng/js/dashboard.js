(function () {
  const widgets = document.querySelectorAll(".dashboard-widget, .chart-card");
  if (!widgets.length) return;

  const isTouch = window.matchMedia("(hover: none)").matches;
  if (isTouch) return;

  widgets.forEach((widget) => {
    widget.addEventListener("mousemove", (e) => {
      const rect = widget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      widget.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    widget.addEventListener("mouseleave", () => {
      widget.style.transform = "";
    });
  });
})();
