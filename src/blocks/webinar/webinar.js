const toggle = document.querySelector('.webinar__additional-info-toggle');

if (toggle) {
  toggle.addEventListener('click', () => {
    const text = toggle.querySelector('span');
    if (!text) return;

    if (toggle.classList.contains('collapsed')) {
      text.textContent = 'показать доп. информацию';
    } else {
      text.textContent = 'скрыть доп. информацию';
    }
  });
}
