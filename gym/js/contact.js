// Contact form: client-side validation, simulated submit with loading state, success message
export function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const statusEl = form.querySelector(".form-status");
  const submitBtn = form.querySelector("button[type='submit']");

  const validators = {
    name: (value) => value.trim().length >= 3 || "الرجاء إدخال الاسم كاملاً (3 أحرف على الأقل)",
    phone: (value) => /^[0-9+\s-]{8,15}$/.test(value.trim()) || "الرجاء إدخال رقم هاتف صحيح",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "الرجاء إدخال بريد إلكتروني صحيح",
    message: (value) => value.trim().length >= 10 || "الرسالة يجب أن تكون 10 أحرف على الأقل",
  };

  function showError(field, message) {
    const group = field.closest(".form-group");
    const errorEl = group?.querySelector(".form-error");
    group?.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message === true ? "" : message || "";
  }

  function validateField(field) {
    const validate = validators[field.name];
    if (!validate) return true;
    const result = validate(field.value);
    showError(field, result === true ? "" : result);
    return result === true;
  }

  Object.keys(validators).forEach((name) => {
    const field = form.elements.namedItem(name);
    field?.addEventListener("blur", () => validateField(field));
    field?.addEventListener("input", () => {
      if (field.closest(".form-group")?.classList.contains("has-error")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach((name) => {
      const field = form.elements.namedItem(name);
      if (field && !validateField(field)) isValid = false;
    });

    if (!isValid) {
      form.querySelector(".has-error input, .has-error textarea")?.focus();
      return;
    }

    form.classList.add("is-loading");
    submitBtn?.setAttribute("disabled", "true");

    // Simulated network request
    window.setTimeout(() => {
      form.classList.remove("is-loading");
      submitBtn?.removeAttribute("disabled");
      statusEl?.classList.add("is-visible");
      if (statusEl) {
        statusEl.textContent = "تم إرسال رسالتك بنجاح، سنتواصل معك قريباً!";
        statusEl.setAttribute("role", "status");
      }
      form.reset();

      window.setTimeout(() => {
        statusEl?.classList.remove("is-visible");
      }, 5000);
    }, 1400);
  });
}
