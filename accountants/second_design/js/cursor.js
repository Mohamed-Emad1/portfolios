/* Custom glow cursor — desktop pointer devices only, disabled on touch */
const Cursor = (() => {
  function init() {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!isFinePointer || !dot || !ring) return;

    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
    });

    function raf() {
      ringX += (targetX - ringX) * .18;
      ringY += (targetY - ringY) * .18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a, button, .glass-card, input, textarea, select').forEach((elm) => {
      elm.addEventListener('mouseenter', () => ring.classList.add('is-active'));
      elm.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
    });

    document.body.style.cursor = 'none';
  }

  return { init };
})();
