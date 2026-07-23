const SVG_NS = 'http://www.w3.org/2000/svg';

function buildDonut(svg) {
  const values = svg.dataset.values.split(',').map(Number);
  const colors = svg.dataset.colors.split(',');
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const r = 50;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;

  svg.setAttribute('viewBox', '0 0 120 120');
  svg.innerHTML = '';

  const track = document.createElementNS(SVG_NS, 'circle');
  track.setAttribute('cx', cx);
  track.setAttribute('cy', cy);
  track.setAttribute('r', r);
  track.setAttribute('fill', 'none');
  track.setAttribute('stroke', 'var(--border)');
  track.setAttribute('stroke-width', '14');
  svg.appendChild(track);

  let cumulativeDeg = -90;
  const segments = [];

  values.forEach((v, i) => {
    const frac = v / total;
    const length = frac * circumference;
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', colors[i % colors.length]);
    circle.setAttribute('stroke-width', '14');
    circle.setAttribute('stroke-dasharray', `${length} ${circumference - length}`);
    circle.setAttribute('stroke-dashoffset', `${length}`);
    circle.setAttribute('transform', `rotate(${cumulativeDeg} ${cx} ${cy})`);
    circle.style.transition = `stroke-dashoffset 1s ease ${i * 0.15}s`;
    svg.appendChild(circle);
    segments.push(circle);
    cumulativeDeg += frac * 360;
  });

  return segments;
}

function buildBarChart(svg) {
  const values = svg.dataset.values.split(',').map(Number);
  const labels = (svg.dataset.labels || '').split(',');
  const max = Math.max(...values, 1);
  const width = 200;
  const height = 120;
  const baseline = 96;
  const maxBarHeight = 74;
  const gap = width / values.length;

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.innerHTML = '';

  const bars = [];
  values.forEach((v, i) => {
    const barWidth = gap * 0.45;
    const x = gap * i + (gap - barWidth) / 2;
    const targetHeight = (v / max) * maxBarHeight;

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', baseline);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', 0);
    rect.setAttribute('rx', 3);
    rect.setAttribute('fill', i % 2 === 0 ? 'var(--color-blue)' : 'var(--color-yellow)');
    rect.style.transition = `height .8s ease ${i * 0.1}s, y .8s ease ${i * 0.1}s`;
    svg.appendChild(rect);
    bars.push({ rect, targetHeight });

    if (labels[i]) {
      const text = document.createElementNS(SVG_NS, 'text');
      text.setAttribute('x', x + barWidth / 2);
      text.setAttribute('y', height - 4);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '9');
      text.setAttribute('fill', 'var(--text-secondary)');
      text.textContent = labels[i].trim();
      svg.appendChild(text);
    }
  });

  return { bars, baseline };
}

export function init() {
  const donuts = Array.from(document.querySelectorAll('.donut-chart')).map((svg) => ({
    svg,
    segments: buildDonut(svg),
  }));

  const bars = Array.from(document.querySelectorAll('.bar-chart')).map((svg) => ({
    svg,
    ...buildBarChart(svg),
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const donut = donuts.find((d) => d.svg === entry.target);
      if (donut) {
        donut.segments.forEach((seg) => { seg.setAttribute('stroke-dashoffset', '0'); });
      }
      const bar = bars.find((b) => b.svg === entry.target);
      if (bar) {
        bar.bars.forEach(({ rect, targetHeight }) => {
          rect.setAttribute('height', targetHeight);
          rect.setAttribute('y', bar.baseline - targetHeight);
        });
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  donuts.forEach((d) => observer.observe(d.svg));
  bars.forEach((b) => observer.observe(b.svg));
}
