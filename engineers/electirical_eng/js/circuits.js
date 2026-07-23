(function () {
  const canvas = document.getElementById("circuitCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width, height, dpr;
  let nodes = [];
  let pulses = [];
  let running = true;
  let rafId = null;

  const NODE_COLOR = "rgba(0, 229, 255, 0.9)";
  const TRACE_COLOR = "rgba(61, 169, 252, 0.18)";
  const PULSE_COLOR = "rgba(0, 229, 255, 0.95)";

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  }

  function buildGrid() {
    nodes = [];
    const cols = Math.max(5, Math.floor(width / 120));
    const rows = Math.max(4, Math.floor(height / 120));
    const spacingX = width / cols;
    const spacingY = height / rows;

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        if (Math.random() > 0.55) continue;
        nodes.push({
          x: i * spacingX + (Math.random() - 0.5) * 24,
          y: j * spacingY + (Math.random() - 0.5) * 24,
        });
      }
    }

    pulses = [];
    for (let i = 0; i < Math.min(6, nodes.length - 1); i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a === b) continue;
      pulses.push({ a, b, t: Math.random(), speed: 0.002 + Math.random() * 0.002 });
    }
  }

  function connections() {
    const lines = [];
    const maxDist = Math.max(width, height) / 6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) lines.push([nodes[i], nodes[j]]);
      }
    }
    return lines;
  }

  let cachedLines = [];

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = TRACE_COLOR;
    cachedLines.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    ctx.fillStyle = NODE_COLOR;
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) {
      pulses.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.beginPath();
        ctx.fillStyle = PULSE_COLOR;
        ctx.shadowColor = PULSE_COLOR;
        ctx.shadowBlur = 8;
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }
  }

  function loop() {
    if (!running) {
      rafId = null;
      return;
    }
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  window.addEventListener(
    "resize",
    debounce(() => {
      resize();
      cachedLines = connections();
    }, 200)
  );

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      running = entry.isIntersecting;
      if (running && !rafId) loop();
    });
  });
  visibilityObserver.observe(canvas.parentElement);

  resize();
  cachedLines = connections();

  if (reduceMotion) {
    draw();
  } else {
    loop();
  }
})();
