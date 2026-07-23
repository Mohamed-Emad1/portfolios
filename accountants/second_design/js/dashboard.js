/* Coordinates the Financial Dashboard section: staggers KPI card reveal on scroll */
const Dashboard = (() => {
  function prepareStagger() {
    const groups = document.querySelectorAll('#dashboard .dashboard-grid, #dashboard .dashboard-charts');
    groups.forEach((group) => {
      Array.from(group.children).forEach((card, i) => {
        card.classList.add('dash-stagger');
        card.style.setProperty('--stagger-i', i);
      });
    });
    return groups;
  }

  function observeReveal(groups) {
    if (!('IntersectionObserver' in window)) {
      groups.forEach((g) => g.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .2 });
    groups.forEach((g) => observer.observe(g));
  }

  function init() {
    if (!document.getElementById('dashboard')) return;
    observeReveal(prepareStagger());
  }

  return { init };
})();
