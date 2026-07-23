(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const palette = ["#e2a93b", "#4da3ff", "#7b61ff", "#46c37b", "#e35d5d", "#c9d1d9", "#f2c14e", "#5ec2c9"];

  function el(tag, attrs) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  }

  function buildBarChart(svg, data) {
    if (!svg) return;
    const w = 300, h = 220, padding = 30;
    const barGap = 6;
    const barWidth = (w - padding) / data.length - barGap;
    const maxVal = 100;

    data.forEach((d, i) => {
      const barHeight = ((h - padding) * d.value) / maxVal;
      const x = padding + i * (barWidth + barGap);
      const y = h - padding - barHeight;

      const rect = el("rect", {
        x, y, width: barWidth, height: 0,
        rx: 3,
        fill: palette[i % palette.length],
      });
      svg.appendChild(rect);
      requestAnimationFrame(() => {
        rect.style.transition = "height 1s cubic-bezier(.22,1,.36,1), y 1s cubic-bezier(.22,1,.36,1)";
        rect.setAttribute("height", barHeight);
        rect.setAttribute("y", y);
      });

      const label = el("text", {
        x: x + barWidth / 2, y: h - 10, "text-anchor": "middle",
        fill: "var(--color-text-secondary, #b8c2cc)", "font-size": "8",
      });
      label.textContent = d.label;
      svg.appendChild(label);
    });

    svg.appendChild(el("line", { x1: padding, y1: h - padding, x2: w, y2: h - padding, stroke: "rgba(255,255,255,0.08)" }));
  }

  function buildDonutChart(svg, data) {
    if (!svg) return;
    const cx = 90, cy = 110, r = 70, strokeWidth = 26;
    const circumference = 2 * Math.PI * r;
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let offsetAccum = 0;

    data.forEach((d, i) => {
      const fraction = d.value / total;
      const dash = fraction * circumference;
      const circle = el("circle", {
        cx, cy, r,
        fill: "none",
        stroke: palette[i % palette.length],
        "stroke-width": strokeWidth,
        "stroke-dasharray": `0 ${circumference}`,
        "stroke-dashoffset": -offsetAccum,
        transform: `rotate(-90 ${cx} ${cy})`,
      });
      svg.appendChild(circle);
      requestAnimationFrame(() => {
        circle.style.transition = "stroke-dasharray 1.2s cubic-bezier(.22,1,.36,1)";
        circle.setAttribute("stroke-dasharray", `${dash} ${circumference}`);
      });
      offsetAccum += dash;
    });

    let legendY = 20;
    const legendX = 185;
    data.forEach((d, i) => {
      const swatch = el("rect", { x: legendX, y: legendY, width: 10, height: 10, rx: 2, fill: palette[i % palette.length] });
      const label = el("text", { x: legendX + 16, y: legendY + 9, "font-size": "9", fill: "var(--color-text-secondary, #b8c2cc)" });
      label.textContent = `${d.label} (${d.value})`;
      svg.appendChild(swatch);
      svg.appendChild(label);
      legendY += 18;
    });
  }

  function init() {
    const softwareData = [...document.querySelectorAll("#softwareSkills .skill-bar-item")].map((el) => ({
      label: el.querySelector(".skill-bar-head span").textContent.split(" ")[0],
      value: Number(el.dataset.skill),
    }));
    buildBarChart(document.getElementById("softwareChart"), softwareData);

    const categoryNames = {
      logo: "شعارات",
      identity: "هوية بصرية",
      ui: "واجهات",
      ads: "إعلانات",
      print: "مطبوعات",
      social: "سوشيال",
      illustration: "رسوم",
    };
    const counts = {};
    document.querySelectorAll("#portfolioGrid .portfolio-item").forEach((item) => {
      const cat = item.dataset.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const categoryData = Object.entries(counts).map(([key, value]) => ({
      label: categoryNames[key] || key,
      value,
    }));
    buildDonutChart(document.getElementById("categoryChart"), categoryData);
  }

  if ("IntersectionObserver" in window) {
    const target = document.getElementById("softwareChart");
    if (target) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              init();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(target);
    }
  } else {
    init();
  }
})();
