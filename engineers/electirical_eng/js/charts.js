(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Sector distribution donut chart ---------------- */
  const sectorChart = document.getElementById("sectorChart");
  const sectorLegend = document.getElementById("sectorLegend");

  const sectors = [
    { label: "الطاقة المتجددة", value: 32, color: "#3da9fc" },
    { label: "الأتمتة الصناعية", value: 26, color: "#00e5ff" },
    { label: "الأنظمة المدمجة", value: 22, color: "#ffd54a" },
    { label: "إنترنت الأشياء", value: 12, color: "#4ade80" },
    { label: "أخرى", value: 8, color: "#7c8794" },
  ];

  function buildDonut() {
    if (!sectorChart) return;
    const cx = 110, cy = 110, r = 80;
    const circumference = 2 * Math.PI * r;
    let offsetAcc = 0;
    const total = sectors.reduce((s, x) => s + x.value, 0);

    sectors.forEach((sector) => {
      const circle = document.createElementNS(SVG_NS, "circle");
      const fraction = sector.value / total;
      const dash = circumference * fraction;

      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", sector.color);
      circle.setAttribute("stroke-width", "24");
      circle.setAttribute("stroke-dasharray", `${dash} ${circumference - dash}`);
      circle.setAttribute("stroke-dashoffset", `${-offsetAcc}`);
      circle.setAttribute("transform", `rotate(-90 ${cx} ${cy})`);
      circle.style.transition = reduceMotion ? "none" : "stroke-dashoffset 1s ease";

      sectorChart.appendChild(circle);
      offsetAcc += dash;

      const legendItem = document.createElement("span");
      legendItem.innerHTML = `<i style="background:${sector.color}"></i> ${sector.label} (${sector.value}%)`;
      sectorLegend.appendChild(legendItem);
    });
  }

  /* ---------------- Tools proficiency bar chart ---------------- */
  const toolsChart = document.getElementById("toolsChart");

  const tools = [
    { label: "MATLAB", value: 95 },
    { label: "Proteus", value: 90 },
    { label: "Altium", value: 88 },
    { label: "AutoCAD", value: 85 },
    { label: "KiCad", value: 82 },
    { label: "LabVIEW", value: 78 },
  ];

  function buildBars() {
    if (!toolsChart) return;
    const width = 320, height = 200;
    const barWidth = width / tools.length - 12;
    const maxBarHeight = 140;

    tools.forEach((tool, i) => {
      const x = i * (width / tools.length) + 8;
      const barHeight = (tool.value / 100) * maxBarHeight;
      const y = height - 30 - barHeight;

      const rect = document.createElementNS(SVG_NS, "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", height - 30);
      rect.setAttribute("width", barWidth);
      rect.setAttribute("height", 0);
      rect.setAttribute("rx", 4);
      rect.setAttribute("fill", "url(#barGradient)");
      toolsChart.appendChild(rect);

      const label = document.createElementNS(SVG_NS, "text");
      label.setAttribute("x", x + barWidth / 2);
      label.setAttribute("y", height - 10);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("fill", "var(--text-muted)");
      label.setAttribute("font-size", "9");
      label.textContent = tool.label;
      toolsChart.appendChild(label);

      requestAnimationFrame(() => {
        rect.style.transition = reduceMotion ? "none" : `height .8s ease ${i * 0.08}s, y .8s ease ${i * 0.08}s`;
        rect.setAttribute("y", y);
        rect.setAttribute("height", barHeight);
      });
    });
  }

  function buildDefs() {
    if (!toolsChart) return;
    const defs = document.createElementNS(SVG_NS, "defs");
    const gradient = document.createElementNS(SVG_NS, "linearGradient");
    gradient.setAttribute("id", "barGradient");
    gradient.setAttribute("x1", "0");
    gradient.setAttribute("y1", "1");
    gradient.setAttribute("x2", "0");
    gradient.setAttribute("y2", "0");
    const stop1 = document.createElementNS(SVG_NS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#3da9fc");
    const stop2 = document.createElementNS(SVG_NS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#00e5ff");
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    toolsChart.appendChild(defs);
  }

  const chartsSection = document.getElementById("dashboard");
  if (chartsSection && "IntersectionObserver" in window) {
    let built = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !built) {
            built = true;
            buildDefs();
            buildBars();
            buildDonut();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(chartsSection);
  } else {
    buildDefs();
    buildBars();
    buildDonut();
  }
})();
