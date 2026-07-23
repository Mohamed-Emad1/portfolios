/* Portfolio category filtering + modal preview (shared by portfolio/projects/reports) */
const Portfolio = (() => {
  const modalCopy = {
    p1: ['إعادة هيكلة مالية لشركة تجارية', 'تحليل شامل للهيكل المالي مع خطة خفض تكاليف أدت إلى توفير 22% من المصروفات التشغيلية خلال 3 أشهر.'],
    p2: ['إعداد قوائم مالية IFRS', 'إعداد قوائم مالية متوافقة بالكامل مع معايير IFRS لشركة تصنيع خلال 6 أسابيع.'],
    p3: ['لوحة Power BI لمتابعة الأداء', 'بناء لوحة تحكم تفاعلية رفعت كفاءة اتخاذ القرار بنسبة 30% لشركة خدمات لوجستية.'],
    report: ['تقرير الأداء المالي', 'تقرير ربع سنوي يغطي المؤشرات المالية الرئيسية ومقارنتها بالأهداف الموضوعة.'],
    budget: ['ميزانية تشغيلية سنوية', 'إعداد ميزانية تشغيلية متكاملة مبنية على تحليل تاريخي وتوقعات النمو.'],
    tax: ['إقرار ضريبي ربع سنوي', 'إعداد وتقديم إقرار ضريبة القيمة المضافة وفق الأنظمة المعتمدة.'],
    powerbi: ['لوحة Power BI تفاعلية', 'لوحة متابعة لحظية للمبيعات والمصروفات مرتبطة مباشرة بقاعدة البيانات.'],
    excel: ['نموذج Excel للتدفقات النقدية', 'نموذج تفاعلي بصيغة Excel لتوقع التدفقات النقدية الشهرية.'],
    erp: ['تطبيق نظام ERP محاسبي', 'أشرفت على تطبيق وحدة المحاسبة في نظام ERP لشركة متوسطة الحجم.'],
    consulting: ['استشارة تخطيط مالي', 'وضع خطة مالية استراتيجية لثلاث سنوات قادمة لمشروع ناشئ.'],
    audit: ['تقرير مراجعة داخلية', 'مراجعة داخلية شاملة للسجلات المالية وتحديد نقاط الضعف الرقابية.'],
    balance: ['الميزانية العمومية', 'عرض شامل ومنظم للأصول والخصوم وحقوق الملكية في تاريخ محدد.'],
    income: ['قائمة الدخل', 'تفصيل دقيق للإيرادات والمصروفات وصافي الربح خلال الفترة المالية.'],
    cashflow: ['التدفقات النقدية', 'تتبع حركة النقد الداخل والخارج من الأنشطة التشغيلية والاستثمارية والتمويلية.'],
    profit: ['تحليل الأرباح', 'دراسة تفصيلية لهوامش الربح ومصادر الإيرادات الرئيسية.'],
    powerbidash: ['لوحات Power BI', 'لوحات معلومات تفاعلية لمتابعة الأداء المالي لحظيًا.'],
    performance: ['تقارير الأداء', 'مؤشرات أداء رئيسية (KPIs) مقارنة بالأهداف الموضوعة سلفًا.'],
  };

  function initFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('#portfolioGrid .portfolio-item');
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach((item) => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.hidden = !show;
        });
      });
    });
  }

  function initModal() {
    const overlay = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');
    if (!overlay) return;

    function open(key) {
      const entry = modalCopy[key] || ['تفاصيل المشروع', 'سيتم عرض تفاصيل هذا العنصر هنا قريبًا.'];
      title.textContent = entry[0];
      body.textContent = entry[1];
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        open(trigger.dataset.openModal);
      });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  function init() {
    initFilter();
    initModal();
  }

  return { init };
})();
