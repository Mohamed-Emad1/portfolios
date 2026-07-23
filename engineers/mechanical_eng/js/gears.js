function buildGearPath(teeth, outerR, rootR, toothDepthRatio = .82) {
  const points = [];
  const step = (Math.PI * 2) / (teeth * 2);
  const innerR = outerR * toothDepthRatio;
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step;
    points.push([50 + r * Math.cos(angle), 50 + r * Math.sin(angle)]);
  }
  return `M${points.map((p) => p.join(',')).join('L')}Z`;
}

function gearSVG(teeth) {
  const outer = 46;
  const bore = 16;
  const path = buildGearPath(teeth, outer, outer * .78);
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${path}" fill="currentColor" opacity=".9"/>
    <circle cx="50" cy="50" r="${bore}" fill="var(--bg-primary)"/>
    <circle cx="50" cy="50" r="${bore}" fill="none" stroke="currentColor" stroke-width="2"/>
  </svg>`;
}

export function init() {
  const gears = document.querySelectorAll('.gear');
  gears.forEach((el) => {
    const teeth = parseInt(el.dataset.teeth, 10) || 12;
    const size = parseInt(el.dataset.size, 10) || 100;
    const speed = parseInt(el.dataset.speed, 10) || 30;
    el.style.setProperty('--gear-size', `${size}px`);
    el.style.setProperty('--gear-duration', `${speed}s`);
    el.innerHTML = gearSVG(teeth);
  });
}
