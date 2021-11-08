const showMoreNodes = document.querySelectorAll('.show-more');

const getDataAttributes = (node) => {
  const getCorrectName = (name) => {
    return name
      .split('-')
      .slice(1)
      .map((word, i) =>
        i === 0
          ? word
          : word[0].toUpperCase() + word.substring(1)
      )
      .join('');
  };

  return Object.fromEntries(
    [...node.attributes]
      .filter((item) => item.name.includes('data-'))
      .map((item) => [getCorrectName(item.name), item.value])
  );
};

const getOptions = (button) => {
  const defaultOptions = {
    queryItems: null,
    showItems: null,
    step: null,
    startText: button.textContent,
    finishText: 'Скрыть',
    media: '(min-width: 320px)',
  };

  return {...defaultOptions, ...getDataAttributes(button)};
};

const init = (button) => {
  const options = getOptions(button);
  const parentNode = button.parentElement;
  const itemNodes = [...parentNode.querySelectorAll(options.queryItems)];
  const hiddenNodes = options.showItems ? itemNodes.slice(options.showItems) : [];
  const media = window.matchMedia(options.media);

  let start = 0;
  let end = hiddenNodes.length;
  let step = options.step ? Number(options.step) : end;

  const showItems = () => {
    if (start >= end) return;
    let length = start + step;

    if (length >= end) {
      length = end;
      button.textContent = options.finishText;
      button.classList.add('show-more_finish');
    }
  
    for (let i = start; i < length; i++) {
      hiddenNodes[i].style.display = null;
    }

    start = length;
  };

  const hideItems = () => {
    hiddenNodes.forEach((item) => item.style.display = 'none');
    start = 0;
    button.textContent = options.startText;
    button.classList.remove('show-more_finish');
  };

  const handleChangeMedia = () => {
    if (media.matches) {
      hideItems();
      button.textContent = options.startText;
      if (Number(options.showItems) >= itemNodes.length) {
        button.style.display = 'none';
      } else {
        button.style.display = null;
      }
    } else {
      showItems();
      button.textContent = options.finishText;
      button.style.display = 'none';
    }
  };

  const handleShowMore = () => {
    if (button.classList.contains('show-more_finish')) {
      hideItems();
    } else {
      showItems();
    }
  };

  button.addEventListener('click', handleShowMore);

  handleChangeMedia();
  media.addEventListener('change', handleChangeMedia);
};

showMoreNodes.forEach(init);
