function initContact() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  const successBox = form.querySelector('.form-success');
  const submitBtn = form.querySelector('button[type="submit"]');

  const validators = {
    name: (v) => v.trim().length >= 3,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => /^[0-9+\s-]{7,}$/.test(v.trim()),
    'case-type': (v) => v.trim().length > 0,
    message: (v) => v.trim().length >= 10,
  };

  const messages = {
    name: 'الرجاء إدخال اسم صحيح (3 أحرف على الأقل)',
    email: 'الرجاء إدخال بريد إلكتروني صحيح',
    phone: 'الرجاء إدخال رقم هاتف صحيح',
    'case-type': 'الرجاء اختيار نوع القضية',
    message: 'الرجاء كتابة رسالة لا تقل عن 10 أحرف',
  };

  function validateField(field) {
    const group = field.closest('.form-group');
    const validator = validators[field.name];
    if (!validator) return true;

    const valid = validator(field.value);
    group.classList.toggle('has-error', !valid);
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = valid ? '' : messages[field.name];
    return valid;
  }

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
    const allValid = fields.reduce((ok, field) => validateField(field) && ok, true);

    if (!allValid) {
      const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea');
      firstError && firstError.focus();
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      form.reset();
      successBox && successBox.classList.add('is-visible');
      setTimeout(() => successBox && successBox.classList.remove('is-visible'), 5000);
    }, 1400);
  });
}
