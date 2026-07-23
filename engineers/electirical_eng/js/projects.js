(function () {
  /* ---------------- Portfolio filtering ---------------- */
  const filterChips = document.querySelectorAll(".filter-chip");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-selected", "true");

      const filter = chip.dataset.filter;

      portfolioItems.forEach((item) => {
        const categories = item.dataset.category.split(" ");
        const show = filter === "all" || categories.includes(filter);
        item.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------------- Project viewer ---------------- */
  const projectData = {
    solar: {
      title: "نظام مراقبة الطاقة الشمسية الذكي",
      client: "شركة سولار جريد",
      sector: "الطاقة المتجددة",
      duration: "4 أشهر",
      tools: "ESP32، MATLAB، Modbus",
      problem: "غياب رؤية لحظية لأداء محطات الطاقة الشمسية الموزعة جغرافيًا.",
      solution: "بناء شبكة استشعار IoT ولوحة تحكم مركزية لمراقبة الإنتاج والأعطال آنيًا.",
      results: "رفع كفاءة التشغيل 22% وخفض زمن الاستجابة للأعطال إلى أقل من ساعة.",
    },
    plc: {
      title: "أتمتة خط إنتاج صناعي",
      client: "مصنع النور الصناعي",
      sector: "الأتمتة الصناعية",
      duration: "6 أشهر",
      tools: "PLC، SCADA، CAN Bus",
      problem: "تشغيل يدوي بطيء يسبب فاقدًا في الإنتاجية والدقة.",
      solution: "تصميم نظام تحكم آلي متكامل مع واجهة إشراف SCADA.",
      results: "ارتفاع الإنتاجية 35% وانخفاض نسبة الأخطاء التشغيلية.",
    },
    medical: {
      title: "جهاز مراقبة حيوية مدمج",
      client: "مجموعة ميديكال تك",
      sector: "الأنظمة المدمجة",
      duration: "5 أشهر",
      tools: "STM32، C++، Altium Designer",
      problem: "الحاجة لجهاز محمول دقيق لمراقبة العلامات الحيوية بتكلفة منخفضة.",
      solution: "تصميم لوحة PCB مدمجة مع خوارزميات معالجة إشارة مخصصة.",
      results: "اعتماد الجهاز في 12 منشأة طبية بدقة قياس تفوق 99%.",
    },
  };

  const order = ["solar", "plc", "medical"];
  const viewer = document.getElementById("projectViewer");
  const viewerImage = document.getElementById("viewerImage");
  const viewerTitle = document.getElementById("viewerTitle");
  const viewerClient = document.getElementById("viewerClient");
  const viewerSector = document.getElementById("viewerSector");
  const viewerDuration = document.getElementById("viewerDuration");
  const viewerTools = document.getElementById("viewerTools");
  const viewerProblem = document.getElementById("viewerProblem");
  const viewerSolution = document.getElementById("viewerSolution");
  const viewerResults = document.getElementById("viewerResults");
  const closeBtn = document.getElementById("viewerClose");
  const prevBtn = document.getElementById("viewerPrev");
  const nextBtn = document.getElementById("viewerNext");

  let currentIndex = 0;

  function renderProject(key) {
    const data = projectData[key];
    if (!data) return;
    viewerTitle.textContent = data.title;
    viewerClient.textContent = data.client;
    viewerSector.textContent = data.sector;
    viewerDuration.textContent = data.duration;
    viewerTools.textContent = data.tools;
    viewerProblem.textContent = data.problem;
    viewerSolution.textContent = data.solution;
    viewerResults.textContent = data.results;
    viewerImage.alt = data.title;
    currentIndex = order.indexOf(key);
  }

  function openViewer(key) {
    renderProject(key);
    viewer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeViewer() {
    viewer.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function showRelative(delta) {
    currentIndex = (currentIndex + delta + order.length) % order.length;
    renderProject(order[currentIndex]);
  }

  document.querySelectorAll("[data-project-view]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openViewer(btn.dataset.project);
    });
  });

  closeBtn.addEventListener("click", closeViewer);
  prevBtn.addEventListener("click", () => showRelative(-1));
  nextBtn.addEventListener("click", () => showRelative(1));

  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) closeViewer();
  });

  document.addEventListener("keydown", (e) => {
    if (!viewer.classList.contains("is-open")) return;
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowLeft") showRelative(document.documentElement.dir === "rtl" ? -1 : 1);
    if (e.key === "ArrowRight") showRelative(document.documentElement.dir === "rtl" ? 1 : -1);
  });
})();
