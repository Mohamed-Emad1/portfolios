(function () {
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;
  let active = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (!active) {
      active = true;
      document.body.classList.add('cursor-active');
    }
  });

  function animate() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animate);
  }
  animate();

  const hoverTargets = document.querySelectorAll('a, button, .practice-card, .case-card, .portfolio-item');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });

  document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  document.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
})();
