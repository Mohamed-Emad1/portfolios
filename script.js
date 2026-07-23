/* ===================== Data ===================== */
const CATEGORY_LABELS = {
  accountants: 'محاسبون',
  doctors: 'أطباء',
  engineers: 'مهندسون',
  graphic_designers: 'مصممو جرافيك',
  gym: 'نادي رياضي',
  interior_design: 'تصميم داخلي',
  lawyers: 'محامون',
  photographers: 'مصورون',
};

const CATEGORY_ICONS = {
  accountants: '🧮',
  doctors: '🩺',
  engineers: '⚙️',
  graphic_designers: '🎨',
  gym: '🏋️',
  interior_design: '🛋️',
  lawyers: '⚖️',
  photographers: '📷',
};

const TEMPLATES = [
  { id: 'acc-1', title: 'محاسب — تصميم كلاسيكي', category: 'accountants', path: 'accountants/first_design', price: 25, desc: 'تصميم بسيط وموثوق لصفحة واحدة للمحاسبين والمستشارين الماليين.' },
  { id: 'acc-2', title: 'محاسب — تصميم عصري', category: 'accountants', path: 'accountants/second_design', price: 25, desc: 'تصميم بديل عصري للمستشارين الماليين والمحاسبين القانونيين.' },
  { id: 'doc-1', title: 'طبيب أسرة', category: 'doctors', path: 'doctors/first_design', price: 25, desc: 'موقع دافئ وودود لأطباء طب الأسرة.' },
  { id: 'doc-2', title: 'طبيب — تصميم 2', category: 'doctors', path: 'doctors/second design', price: 25, desc: 'تصميم طبي بديل يحتوي أقسام الخدمات والحجز.' },
  { id: 'doc-3', title: 'طبيب — تصميم 3', category: 'doctors', path: 'doctors/third design', price: 29, desc: 'محفظة طبية مميزة بأقسام بصرية أكثر ثراءً.' },
  { id: 'eng-civil', title: 'مهندس مدني', category: 'engineers', path: 'engineers/civil_eng', price: 29, desc: 'محفظة تركز على المشاريع لمحترفي الهندسة المدنية.' },
  { id: 'eng-elec', title: 'مهندس كهرباء', category: 'engineers', path: 'engineers/electirical_eng', price: 29, desc: 'محفظة تقنية لمهندسي أنظمة القدرة والإلكترونيات.' },
  { id: 'eng-mech', title: 'مهندس ميكانيكا', category: 'engineers', path: 'engineers/mechanical_eng', price: 29, desc: 'عرض تقديمي لمهندسي التصميم والتصنيع وتطوير المنتجات.' },
  { id: 'gfx-1', title: 'مصمم جرافيك — تصميم 1', category: 'graphic_designers', path: 'graphic_designers/first_design', price: 29, desc: 'تصميم جريء يركز على الصور لمصممي الهوية البصرية.' },
  { id: 'gfx-2', title: 'مصمم جرافيك — تصميم 2', category: 'graphic_designers', path: 'graphic_designers/second_design', price: 29, desc: 'محفظة إبداعية بديلة لمصممي الجرافيك.' },
  { id: 'gfx-3', title: 'مصمم جرافيك — تصميم 3', category: 'graphic_designers', path: 'graphic_designers/third_design', price: 29, desc: 'تصميم يعتمد على معرض الأعمال لمحافظ الهوية البصرية.' },
  { id: 'gym', title: 'موقع نادي ومدرب رياضي', category: 'gym', path: 'gym', price: 59, desc: 'موقع رياضي متعدد الأقسام يشمل الأسعار والمدربين والمعرض والأسئلة الشائعة.' },
  { id: 'int-1', title: 'مصمم ديكور داخلي — تصميم 1', category: 'interior_design', path: 'interior_design/first_design', price: 29, desc: 'عرض أنيق لاستوديوهات التصميم الداخلي.' },
  { id: 'int-2', title: 'استوديو تصميم داخلي فاخر', category: 'interior_design', path: 'interior_design/second_desing', price: 29, desc: 'تصميم راقٍ لعلامات التصميم الداخلي الفاخرة.' },
  { id: 'int-3', title: 'استوديو تصميم داخلي — عصري', category: 'interior_design', path: 'interior_design/third_design', price: 35, desc: 'محفظة عصرية غنية بالصور لاستوديوهات التصميم.' },
  { id: 'law-1', title: 'محامٍ ومستشار قانوني — تصميم 1', category: 'lawyers', path: 'lawyers/first_Design', price: 25, desc: 'تصميم احترافي وموثوق للمحامين والمستشارين القانونيين.' },
  { id: 'law-2', title: 'محامٍ ومستشار قانوني — تصميم 2', category: 'lawyers', path: 'lawyers/second_design', price: 25, desc: 'تصميم قانوني بديل.' },
  { id: 'pho-1', title: 'مصور فوتوغرافي — تصميم 1', category: 'photographers', path: 'photographers/first_design', price: 25, desc: 'موقع يركز على معرض الصور للمصورين المحترفين.' },
  { id: 'pho-2', title: 'مصور فوتوغرافي — تصميم 2', category: 'photographers', path: 'photographers/second_design', price: 25, desc: 'تصميم بديل لمحفظة التصوير الفوتوغرافي.' },
  { id: 'pho-3', title: 'مصور أفلام زفاف سينمائي', category: 'photographers', path: 'photographers/third_design', price: 29, desc: 'موقع سينمائي يعتمد على الفيديو لمصوري حفلات الزفاف.' },
];

/* ===================== Render template grid ===================== */
const grid = document.getElementById('templatesGrid');
const cfTemplate = document.getElementById('cf-template');

function encodedPath(path) {
  return path.split('/').map(encodeURIComponent).join('/');
}

function renderCards(list) {
  grid.innerHTML = '';
  list.forEach((tpl) => {
    const href = `${encodedPath(tpl.path)}/index.html`;
    const card = document.createElement('article');
    card.className = 'tpl-card';
    card.dataset.category = tpl.category;

    card.innerHTML = `
      <div class="tpl-card__thumb">
        <div class="tpl-card__thumb-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
        <span class="tpl-card__cat-tag">${CATEGORY_LABELS[tpl.category]}</span>
        <span class="tpl-card__price-tag">${tpl.price}$</span>
        <span class="tpl-card__icon" aria-hidden="true">${CATEGORY_ICONS[tpl.category]}</span>
        <a class="tpl-card__overlay" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="فتح المعاينة الحية لِـ ${tpl.title}">
          <span class="btn btn--primary btn--sm">معاينة حية</span>
        </a>
      </div>
      <div class="tpl-card__body">
        <h3 class="tpl-card__title">${tpl.title}</h3>
        <p class="tpl-card__desc">${tpl.desc}</p>
        <div class="tpl-card__footer">
          <span class="tpl-card__price">${tpl.price}$</span>
          <div class="tpl-card__actions">
            <a class="btn btn--outline btn--sm" href="${href}" target="_blank" rel="noopener noreferrer">معاينة</a>
            <a class="btn btn--primary btn--sm" href="#contact" data-buy="${tpl.id}">اشترِ</a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function populateTemplateSelect() {
  TEMPLATES.forEach((tpl) => {
    const opt = document.createElement('option');
    opt.value = tpl.id;
    opt.textContent = `${tpl.title} (${tpl.price}$)`;
    cfTemplate.appendChild(opt);
  });
}

/* ===================== Filters ===================== */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    const filtered = filter === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);
    renderCards(filtered);
  });
});

/* ===================== Buy button -> scroll + preselect ===================== */
document.addEventListener('click', (e) => {
  const buyBtn = e.target.closest('[data-buy]');
  if (!buyBtn) return;
  const id = buyBtn.dataset.buy;
  cfTemplate.value = id;
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

/* ===================== Mobile nav ===================== */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===================== Contact form -> mailto ===================== */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const templateId = cfTemplate.value;
  const templateLabel = templateId
    ? TEMPLATES.find((t) => t.id === templateId)?.title || ''
    : 'استفسار عام';

  const subject = `استفسار عن قالب: ${templateLabel}`;
  const body = [
    `الاسم: ${name}`,
    `البريد الإلكتروني: ${email}`,
    `القالب: ${templateLabel}`,
    '',
    message,
  ].join('\n');

  const mailto = `mailto:mohamed.emad45621@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});

/* ===================== Read ?template= from a badge link on a template page ===================== */
function preselectFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const templateId = params.get('template');
  if (templateId && TEMPLATES.some((t) => t.id === templateId)) {
    cfTemplate.value = templateId;
  }
}

/* ===================== Init ===================== */
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('statTemplates').textContent = TEMPLATES.length;
document.getElementById('statCategories').textContent = Object.keys(CATEGORY_LABELS).length;
populateTemplateSelect();
renderCards(TEMPLATES);
preselectFromQuery();

if (window.location.hash === '#contact') {
  document.getElementById('contact').scrollIntoView();
}
