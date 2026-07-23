(function () {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const submitBtn = document.getElementById("submitBtn");

  if (!form) return;

  const validators = {
    firstName: (v) => v.trim().length >= 2 || "الرجاء إدخال الاسم الأول",
    lastName: (v) => v.trim().length >= 2 || "الرجاء إدخال الاسم الأخير",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "الرجاء إدخال بريد إلكتروني صحيح",
    serviceType: (v) => v.trim().length > 0 || "الرجاء اختيار نوع الخدمة",
    message: (v) => v.trim().length >= 10 || "الرجاء كتابة رسالة لا تقل عن 10 أحرف",
  };

  function validateField(field) {
    const validator = validators[field.name];
    const group = field.closest(".form-group");
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (!validator) return true;

    const result = validator(field.value);
    if (result === true) {
      group?.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
      return true;
    }
    group?.classList.add("has-error");
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  Object.keys(validators).forEach((name) => {
    const field = form.elements[name];
    field?.addEventListener("blur", () => validateField(field));
    field?.addEventListener("input", () => {
      if (field.closest(".form-group")?.classList.contains("has-error")) {
        validateField(field);
      }
    });
  });

  function showToast() {
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 4000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field && !validateField(field)) isValid = false;
    });

    if (!isValid) {
      form.querySelector(".has-error input, .has-error select, .has-error textarea")?.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    const originalText = submitBtn.querySelector(".btn-text").textContent;
    submitBtn.querySelector(".btn-text").textContent = "جارٍ الإرسال...";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
      submitBtn.querySelector(".btn-text").textContent = originalText;
      form.reset();
      showToast();
    }, 1200);
  });
})();
