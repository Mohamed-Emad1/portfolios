(function () {
  // ---------- FAQ accordion ----------
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-item__question");
    const answer = item.querySelector(".faq-item__answer");

    question?.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-item__question")?.setAttribute("aria-expanded", "false");
        other.querySelector(".faq-item__answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  // ---------- Smooth in-page navigation offset for sticky navbar ----------
  const navbarHeight = () =>
    parseInt(getComputedStyle(document.documentElement).getPropertyValue("--navbar-height")) || 84;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight() + 1;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
