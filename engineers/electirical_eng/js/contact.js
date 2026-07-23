(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const statusBox = document.getElementById("formStatus");
  const toast = document.getElementById("toast");

  const name = document.getElementById("fname");
  const email = document.getElementById("femail");
  const message = document.getElementById("fmessage");

  function setError(input, msg) {
    const group = input.closest(".form-group");
    const errorEl = form.querySelector(`[data-error-for="${input.id}"]`);
    group.classList.toggle("has-error", Boolean(msg));
    if (errorEl) errorEl.textContent = msg || "";
  }

  function validate() {
    let valid = true;

    if (!name.value.trim()) {
      setError(name, "الاسم مطلوب");
      valid = false;
    } else {
      setError(name, "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
      setError(email, "يرجى إدخال بريد إلكتروني صحيح");
      valid = false;
    } else {
      setError(email, "");
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, "الرسالة يجب أن تكون 10 أحرف على الأقل");
      valid = false;
    } else {
      setError(message, "");
    }

    return valid;
  }

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  [name, email, message].forEach((input) => {
    input.addEventListener("blur", validate);
    input.addEventListener("input", () => setError(input, ""));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) {
      showToast("يرجى تصحيح الحقول المميزة قبل الإرسال");
      return;
    }

    submitBtn.classList.add("btn-loading");
    submitBtn.disabled = true;
    statusBox.classList.remove("is-visible");

    setTimeout(() => {
      submitBtn.classList.remove("btn-loading");
      submitBtn.disabled = false;
      statusBox.classList.add("is-visible");
      showToast("تم إرسال طلبك بنجاح");
      form.reset();
    }, 1400);
  });
})();
