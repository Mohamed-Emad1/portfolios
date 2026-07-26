/*
  Applies window.SITE_CONFIG (see config.js) to the page:
  - theme keys become CSS custom properties on :root (colors, fonts)
  - business keys fill every element tagged with [data-bind="business.xxx"]
  Runs once on load; no build step needed.
*/
(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  function toCssVar(key) {
    return '--' + key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  function get(path) {
    return path.split('.').reduce((val, key) => (val == null ? val : val[key]), cfg);
  }

  const root = document.documentElement.style;
  Object.entries(cfg.theme || {}).forEach(([key, value]) => {
    if (value) root.setProperty(toCssVar(key), value);
  });

  document.querySelectorAll('[data-bind]').forEach((el) => {
    const path = el.getAttribute('data-bind');
    let value = get(path);
    if (value === undefined || value === null || value === '') return;
    const attr = el.getAttribute('data-bind-attr');
    if (attr === 'href' && path === 'business.email') value = 'mailto:' + value;
    if (attr === 'href' && path === 'business.phone') value = 'tel:' + String(value).replace(/[^\d+]/g, '');
    if (attr === 'href' && path === 'business.whatsapp') value = 'https://wa.me/' + String(value).replace(/\D/g, '');
    if (attr) el.setAttribute(attr, value);
    else if (el.tagName === 'IMG') el.src = value;
    else el.textContent = value;
  });

  const b = cfg.business || {};
  if (b.name && b.role) document.title = `${b.name} | ${b.role}`;
})();
