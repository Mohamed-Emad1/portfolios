(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const host = document.querySelector(".hero__circuit-bg");
  if (!host || reduceMotion) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  });
  host.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width, height, dpr;
  let particles = [];
  let running = true;

  const COUNT = 26;
  const COLORS = ["rgba(61,169,252,0.55)", "rgba(0,229,255,0.5)", "rgba(255,213,74,0.4)"];

  function resize() {
    const rect = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.6,
      vy: -(0.06 + Math.random() * 0.14),
      vx: (Math.random() - 0.5) * 0.06,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(step);
  }

  function debounce(fn, delay) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), delay);
    };
  }

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning) requestAnimationFrame(step);
    });
  });
  visibilityObserver.observe(host);

  window.addEventListener(
    "resize",
    debounce(() => {
      resize();
    }, 200)
  );

  resize();
  makeParticles();
  requestAnimationFrame(step);
})();
