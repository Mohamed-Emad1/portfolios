/* ==========================================================================
   Main Script — coordinates preloader, FAQ accordion, and contact form
   (navbar.js, gallery.js, animations.js, slider.js, cursor.js load separately)
   ========================================================================== */
(function () {
  /* Preloader ------------------------------------------------------------ */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    preloader?.classList.add("is-loaded");
  });
  /* Fallback in case the load event already fired or assets stall */
  setTimeout(() => preloader?.classList.add("is-loaded"), 2500);

  /* FAQ Accordion ------------------------------------------------------------ */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const inner = item.querySelector(".faq-answer__inner");

    if (item.classList.contains("is-open")) {
      answer.style.maxHeight = inner.offsetHeight + "px";
    }

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = inner.offsetHeight + "px";
      }
    });
  });

  /* Contact Form ------------------------------------------------------------ */
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  const validators = {
    fullName: (v) => (v.trim().length >= 2 ? "" : "الرجاء إدخال اسم صحيح لا يقل عن حرفين"),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "الرجاء إدخال بريد إلكتروني صحيح"),
    phone: (v) => (/^[0-9+\s-]{7,15}$/.test(v) ? "" : "الرجاء إدخال رقم هاتف صحيح"),
    serviceType: (v) => (v ? "" : "الرجاء اختيار نوع الخدمة"),
    sessionDate: (v) => {
      if (!v) return "الرجاء اختيار تاريخ الجلسة";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(v) >= today ? "" : "الرجاء اختيار تاريخ في المستقبل";
    },
    message: (v) => (v.trim().length >= 10 ? "" : "الرجاء كتابة رسالة لا تقل عن 10 أحرف"),
  };

  function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;
    const error = validator(field.value);
    const errorEl = document.getElementById(field.id + "Error");
    if (errorEl) errorEl.textContent = error;
    field.setAttribute("aria-invalid", error ? "true" : "false");
    return !error;
  }

  Object.keys(validators).forEach((name) => {
    const field = form.elements.namedItem(name);
    field?.addEventListener("blur", () => validateField(field));
    field?.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach((name) => {
      const field = form.elements.namedItem(name);
      if (field && !validateField(field)) isValid = false;
    });

    formStatus.className = "form-status";
    formStatus.textContent = "";

    if (!isValid) {
      formStatus.classList.add("is-error");
      formStatus.textContent = "يرجى تصحيح الأخطاء أعلاه قبل إرسال الطلب.";
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("btn-loading");
    const originalText = submitBtn.querySelector(".btn-text").textContent;
    submitBtn.querySelector(".btn-text").textContent = "جاري الإرسال...";
    submitBtn.insertAdjacentHTML("beforeend", '<span class="btn-spinner"></span>');

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("btn-loading");
      submitBtn.querySelector(".btn-text").textContent = originalText;
      submitBtn.querySelector(".btn-spinner")?.remove();

      formStatus.classList.add("is-success");
      formStatus.textContent = "تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة.";
      form.reset();
    }, 1400);
  });
})();
