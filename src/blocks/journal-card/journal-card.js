const favoriteNodes = document.querySelectorAll('.journal-card__favorite');

const setAriaLabel = (node) => {
  if (node.classList.contains('journal-card__favorite_active')) {
    node.setAttribute('aria-label', 'Убрать из избранного');
  } else {
    node.setAttribute('aria-label', 'Добавить в избранное');
  }
};

const handleFavorite = (event) => {
  const favoriteNode = event.currentTarget;

  favoriteNode.classList.toggle('journal-card__favorite_active');

  setAriaLabel(favoriteNode);
};

favoriteNodes.forEach((favorite) => {
  setAriaLabel(favorite);
  favorite.addEventListener('click', handleFavorite);
});
