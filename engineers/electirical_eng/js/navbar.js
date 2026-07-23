(function () {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll("[data-nav]");

  let lastScroll = 0;

  function onScroll() {
    const current = window.scrollY;

    if (current > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }

    if (current > lastScroll && current > header.offsetHeight * 2) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    lastScroll = current;
    updateActiveLink();
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll("main section[id]");
    let activeId = sections[0] ? sections[0].id : null;
    const offset = header.offsetHeight + 40;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= offset) {
        activeId = section.id;
      }
    });

    links.forEach((link) => {
      const href = link.getAttribute("href").replace("#", "");
      link.classList.toggle("is-active", href === activeId);
    });
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  window.addEventListener("scroll", debounce(onScroll, 10), { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  onScroll();
})();
