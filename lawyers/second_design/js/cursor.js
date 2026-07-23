function initCursor() {
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isDesktop) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.append(glow, dot);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    glow.classList.add('is-active');
    dot.classList.add('is-active');
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('is-active');
    dot.classList.remove('is-active');
  });

  function raf() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  }
  raf();

  const hoverTargets = 'a, button, .case-card, .practice-card, input, textarea, select';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) dot.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) dot.classList.remove('is-hover');
  });
}
