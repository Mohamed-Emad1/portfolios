/* Animated SVG charts fed by a static demo dataset — no external chart library */
const Charts = (() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const data = {
    monthly: [
      { label: 'يناير', revenue: 62, expense: 38 },
      { label: 'فبراير', revenue: 70, expense: 42 },
      { label: 'مارس', revenue: 58, expense: 35 },
      { label: 'أبريل', revenue: 80, expense: 48 },
      { label: 'مايو', revenue: 92, expense: 50 },
      { label: 'يونيو', revenue: 86, expense: 46 },
    ],
    clientGrowth: [40, 55, 62, 78, 95, 120, 145, 168, 190, 220, 260, 300],
    distribution: [
      { label: 'إدارة الحسابات', value: 32, color: 'var(--color-primary)' },
      { label: 'التحليل المالي', value: 24, color: 'var(--color-secondary)' },
      { label: 'الضرائب والزكاة', value: 20, color: 'var(--color-gold)' },
      { label: 'الاستشارات', value: 24, color: 'var(--color-success)' },
    ],
  };

  function el(tag, attrs) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  }

  function renderBarChart(container) {
    const w = 480, h = 220, padBottom = 26, barGap = 18;
    const barWidth = (w - barGap * (data.monthly.length + 1)) / (data.monthly.length * 2);
    const max = Math.max(...data.monthly.map((d) => Math.max(d.revenue, d.expense)));
    const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'xMidYMax meet' });

    data.monthly.forEach((d, i) => {
      const groupX = barGap + i * (barWidth * 2 + barGap);
      const revH = (d.revenue / max) * (h - padBottom - 10);
      const expH = (d.expense / max) * (h - padBottom - 10);

      svg.appendChild(el('rect', {
        class: 'bar', x: groupX, y: h - padBottom - revH, width: barWidth, height: revH,
        rx: 5, fill: 'var(--color-primary)',
      }));
      svg.appendChild(el('rect', {
        class: 'bar', x: groupX + barWidth + 4, y: h - padBottom - expH, width: barWidth, height: expH,
        rx: 5, fill: 'var(--color-gold)',
      }));
      const label = el('text', {
        x: groupX + barWidth, y: h - 6, 'font-size': 10, fill: 'var(--color-subtitle)', 'text-anchor': 'middle',
      });
      label.textContent = d.label;
      svg.appendChild(label);
    });

    container.innerHTML = '';
    container.appendChild(svg);
    return svg;
  }

  function renderLineChart(container) {
    const w = 460, h = 200, pad = 16;
    const max = Math.max(...data.clientGrowth);
    const step = (w - pad * 2) / (data.clientGrowth.length - 1);
    const points = data.clientGrowth.map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - (v / max) * (h - pad * 2);
      return [x, y];
    });

    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
    const areaPath = `${path} L${points[points.length - 1][0]},${h - pad} L${points[0][0]},${h - pad} Z`;

    const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'xMidYMax meet' });
    const gradient = el('linearGradient', { id: 'lineFill', x1: 0, y1: 0, x2: 0, y2: 1 });
    gradient.appendChild(el('stop', { offset: '0%', 'stop-color': 'var(--color-primary)', 'stop-opacity': .35 }));
    gradient.appendChild(el('stop', { offset: '100%', 'stop-color': 'var(--color-primary)', 'stop-opacity': 0 }));
    const defs = el('defs', {});
    defs.appendChild(gradient);
    svg.appendChild(defs);

    svg.appendChild(el('path', { d: areaPath, fill: 'url(#lineFill)', stroke: 'none' }));
    svg.appendChild(el('path', {
      class: 'line-path', d: path, fill: 'none', stroke: 'var(--color-primary)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    }));
    points.forEach((p) => {
      svg.appendChild(el('circle', { cx: p[0], cy: p[1], r: 3.5, fill: 'var(--color-primary)' }));
    });

    container.innerHTML = '';
    container.appendChild(svg);
    return svg;
  }

  function renderPieChart(container) {
    const size = 220, radius = 80, cx = size / 2, cy = size / 2;
    const total = data.distribution.reduce((sum, d) => sum + d.value, 0);
    const circumference = 2 * Math.PI * radius;
    let offsetAcc = 0;

    const svg = el('svg', { viewBox: `0 0 ${size} ${size}` });
    const group = el('g', { transform: `rotate(-90 ${cx} ${cy})` });

    data.distribution.forEach((d) => {
      const fraction = d.value / total;
      const dash = fraction * circumference;
      const circle = el('circle', {
        class: 'pie-segment', cx, cy, r: radius, fill: 'none', stroke: d.color, 'stroke-width': 26,
        'stroke-dasharray': `0 ${circumference}`, 'stroke-dashoffset': -offsetAcc,
      });
      circle.dataset.finalDash = `${dash} ${circumference - dash}`;
      group.appendChild(circle);
      offsetAcc += dash;
    });

    svg.appendChild(group);
    const label = el('text', {
      x: cx, y: cy, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 16, 'font-weight': 800, fill: 'var(--color-text)',
    });
    label.textContent = `${total}%`;
    svg.appendChild(label);

    const legend = document.createElement('div');
    legend.className = 'chart-legend';
    legend.style.cssText = 'flex-wrap:wrap;margin-top:1rem;justify-content:center';
    data.distribution.forEach((d) => {
      const span = document.createElement('span');
      span.innerHTML = `<i class="legend-dot" style="background:${d.color}"></i> ${d.label}`;
      legend.appendChild(span);
    });

    container.innerHTML = '';
    container.appendChild(svg);
    container.appendChild(legend);

    requestAnimationFrame(() => {
      group.querySelectorAll('.pie-segment').forEach((c) => {
        c.setAttribute('stroke-dasharray', c.dataset.finalDash);
      });
    });

    return svg;
  }

  function renderMiniCalendar(container) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayNames = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

    container.innerHTML = '';
    dayNames.forEach((n) => {
      const span = document.createElement('span');
      span.style.fontWeight = '700';
      span.textContent = n[0];
      container.appendChild(span);
    });

    const firstWeekday = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstWeekday; i++) container.appendChild(document.createElement('span'));

    for (let d = 1; d <= daysInMonth; d++) {
      const span = document.createElement('span');
      span.textContent = d;
      if (d === today.getDate()) span.classList.add('active');
      container.appendChild(span);
    }
  }

  function observeInView(el, cb) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          cb();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .3 });
    observer.observe(el);
  }

  function init() {
    const bar = document.getElementById('barChart');
    const pie = document.getElementById('pieChart');
    const line = document.getElementById('lineChart');
    const calendar = document.getElementById('miniCalendar');

    if (bar) observeInView(bar, () => renderBarChart(bar));
    if (pie) observeInView(pie, () => renderPieChart(pie));
    if (line) observeInView(line, () => renderLineChart(line));
    if (calendar) renderMiniCalendar(calendar);
  }

  return { init, data };
})();
