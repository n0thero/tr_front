const parent = document.querySelector('.included-training');

if (parent) {
  const hideList = parent.querySelectorAll('.included-training__item_hide');
  const btnShowMore = parent.querySelector('.included-training__show-more');
  
  function toggleHideList() {
    hideList.forEach(function(item ) {
      item.classList.toggle('included-training__item_hide');
    });
  }
  
  if (btnShowMore && hideList && btnShowMore) {
    btnShowMore.addEventListener('click', function() {
      btnShowMore.classList.toggle('included-training__show-more_active');
      toggleHideList();
  
      if (btnShowMore.classList.contains('included-training__show-more_active')) {
        btnShowMore.textContent = 'Свернуть';
  
      } else {
        btnShowMore.textContent = 'Смотреть дальше';
      }
    });
  }
}
