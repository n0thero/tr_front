const buttonsShowMore = document.querySelectorAll('.training-program__show-more');

buttonsShowMore.forEach(function(button) {
  const parent = button.closest('.training-program');

  if (!parent) return;

  const hideItems = parent.querySelectorAll('.training-program__item_hide');

  button.addEventListener('click', function() {
    button.classList.toggle('training-program__show-more_active');

    if (button.classList.contains('training-program__show-more_active')) {
      button.textContent = 'Свернуть';
      hideItems.forEach(function(item) {
        item.classList.remove('training-program__item_hide');
      });
    } else {
      button.textContent = 'Смотреть полностью';
      hideItems.forEach(function(item) {
        item.classList.add('training-program__item_hide');
      });
    }
  });
});
