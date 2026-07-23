/* Contact form: validation, fake async submit with loading state, toast feedback */
const Contact = (() => {
  let form, toast, toastMessage, submitBtn, submitLabel;
  let toastTimer;

  const validators = {
    name: (v) => v.trim().length >= 2 || 'يرجى إدخال الاسم كاملاً',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'يرجى إدخال بريد إلكتروني صحيح',
    message: (v) => v.trim().length >= 10 || 'يرجى كتابة رسالة لا تقل عن 10 أحرف',
  };

  function showToast(message, type) {
    toastMessage.textContent = message;
    toast.className = `toast is-visible ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4000);
  }

  function setFieldError(field, message) {
    const group = field.closest('.form-group');
    group.classList.toggle('has-error', Boolean(message));
    group.querySelector('.form-error').textContent = message || '';
  }

  function validateForm() {
    let valid = true;
    Object.entries(validators).forEach(([name, validate]) => {
      const field = form.elements[name];
      const result = validate(field.value);
      if (result !== true) {
        setFieldError(field, result);
        valid = false;
      } else {
        setFieldError(field, '');
      }
    });
    return valid;
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.innerHTML = isLoading
      ? '<span class="spinner"></span> جارِ الإرسال...'
      : '<svg width="16" height="16"><use href="#icon-send"/></svg> إرسال الرسالة';
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      showToast('يرجى تصحيح الحقول المطلوبة', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('تم إرسال رسالتك بنجاح، سأتواصل معك قريبًا.', 'success');
      form.reset();
    }, 1400);
  }

  function init() {
    form = document.getElementById('contactForm');
    toast = document.getElementById('toast');
    toastMessage = document.getElementById('toastMessage');
    submitBtn = document.getElementById('contactSubmit');
    if (!form) return;

    form.addEventListener('submit', handleSubmit);
    Object.keys(validators).forEach((name) => {
      form.elements[name].addEventListener('blur', () => {
        const result = validators[name](form.elements[name].value);
        setFieldError(form.elements[name], result === true ? '' : result);
      });
    });
  }

  return { init };
})();
