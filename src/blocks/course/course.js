const buttonsShowMore = document.querySelectorAll('.course__lesson-more');

buttonsShowMore.forEach(function(button) {
  const parent = button.closest('.course');

  if (!parent) return;

  const hideItems = parent.querySelectorAll('.course__lesson-item_hide');

  button.addEventListener('click', function() {
    button.classList.toggle('course__lesson-more_active');

    if (button.classList.contains('course__lesson-more_active')) {
      button.textContent = 'Свернуть';
      hideItems.forEach(function(item) {
        item.classList.remove('course__lesson-item_hide');
      });
    } else {
      button.textContent = 'Остальные уроки';
      hideItems.forEach(function(item) {
        item.classList.add('course__lesson-item_hide');
      });
    }
  });
});
