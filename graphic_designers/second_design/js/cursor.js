(function () {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isTouch || reduceMotion) return;

  const dot = document.getElementById("cursorDot");
  const glow = document.getElementById("cursorGlow");
  if (!dot || !glow) return;

  let dotX = 0, dotY = 0, glowX = 0, glowY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function loop() {
    dotX += (targetX - dotX) * 0.9;
    dotY += (targetY - dotY) * 0.9;
    glowX += (targetX - glowX) * 0.15;
    glowY += (targetY - glowY) * 0.15;

    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  const hoverTargets = "a, button, .card, .dashboard-widget, .portfolio-item, input, textarea, select";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) glow.classList.add("active");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) glow.classList.remove("active");
  });
})();
