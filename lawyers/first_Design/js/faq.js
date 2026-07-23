(function () {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  function setAnswerHeight(item, open) {
    const answer = item.querySelector('.faq-answer');
    answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
  }

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        setAnswerHeight(other, false);
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        setAnswerHeight(item, true);
      }
    });
  });

  /* Initialize the first (already-active) item */
  const active = document.querySelector('.faq-item.active');
  if (active) setAnswerHeight(active, true);

  window.addEventListener('resize', () => {
    const openItem = document.querySelector('.faq-item.active');
    if (openItem) setAnswerHeight(openItem, true);
  });
})();
