(function () {
  /* ---- Portfolio filtering ---- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---- Case modal ---- */
  const caseData = [
    {
      badge: 'القانون التجاري',
      title: 'نزاع تجاري كبرى',
      sector: 'التكنولوجيا',
      result: 'تسوية لصالح العميل',
      duration: '8 أشهر',
      desc: 'تمثيل شركة تقنية ناشئة في نزاع تجاري معقد يتعلق بخرق عقد شراكة استراتيجية. تم التوصل إلى تسوية شاملة حفظت حقوق العميل التجارية وسمحت باستمرار العمليات دون انقطاع، وذلك من خلال استراتيجية تفاوضية دقيقة واستخدام أدوات قانونية بديلة لحل النزاعات.',
    },
    {
      badge: 'التحكيم',
      title: 'تحكيم دولي',
      sector: 'الطاقة',
      result: 'حكم تحكيمي لصالح العميل',
      duration: '11 شهراً',
      desc: 'تمثيل عميل في نزاع تحكيم تجاري دولي عابر للحدود يتعلق بعقد توريد طويل الأجل. تمت إدارة الإجراءات أمام هيئة تحكيم دولية، وانتهت القضية بحكم تحكيمي لصالح العميل مع تعويض كامل عن الأضرار التعاقدية.',
    },
    {
      badge: 'قانون الشركات',
      title: 'اندماج شركات',
      sector: 'العقارات',
      result: 'إتمام الصفقة بنجاح',
      duration: '6 أشهر',
      desc: 'تقديم الاستشارات القانونية الكاملة لعملية اندماج بين شركتين عقاريتين، شملت الفحص النافي للجهالة، صياغة اتفاقية الاندماج، والتنسيق مع الجهات التنظيمية حتى إتمام الصفقة بنجاح تام.',
    },
  ];

  const modal = document.getElementById('caseModal');
  const modalClose = document.getElementById('modalClose');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMeta = modal ? modal.querySelectorAll('.modal-meta div') : [];
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const caseTriggers = document.querySelectorAll('[data-modal-target]');

  let currentIndex = 0;

  function renderCase(index) {
    const data = caseData[index];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalMeta[0].innerHTML = `<span>القطاع</span>${data.sector}`;
    modalMeta[1].innerHTML = `<span>النتيجة</span>${data.result}`;
    modalMeta[2].innerHTML = `<span>المدة</span>${data.duration}`;
    currentIndex = index;
  }

  function openModal(index) {
    renderCase(index);
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  caseTriggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', () => openModal(idx));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(idx);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  if (modalNext) {
    modalNext.addEventListener('click', () => {
      renderCase((currentIndex + 1) % caseData.length);
    });
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', () => {
      renderCase((currentIndex - 1 + caseData.length) % caseData.length);
    });
  }
})();
