(function () {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  const glow = document.getElementById("mouseGlow");
  if (!dot || !ring) return;

  document.body.classList.add("custom-cursor-active");

  let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
    dot.classList.add("active");
    ring.classList.add("active");
    if (glow) {
      glow.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      glow.classList.add("active");
    }
  });

  document.addEventListener("mouseleave", () => {
    dot.classList.remove("active");
    ring.classList.remove("active");
    if (glow) glow.classList.remove("active");
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.15;
    ringY += (targetY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = "a, button, .gallery-item, .experience-card, .video-card, input, textarea, select";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add("hovering");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove("hovering");
  });
})();
