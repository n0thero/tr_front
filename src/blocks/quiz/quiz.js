import '../quiz-preview/quiz-preview';
import '../quiz-test/quiz-test';

import { currentIndex } from './js/state';
import { CHANGE_CURRENT_INDEX, observerCurrentIndex } from './js/observer';

const boxNodes = document.querySelectorAll('.quiz__box');

const showBox = (index) => {
  boxNodes.forEach((box) => box.classList.remove('quiz__box_active'));
  boxNodes[index]?.classList.add('quiz__box_active');
};

export {
  showBox,
};

observerCurrentIndex.add(CHANGE_CURRENT_INDEX, () => {
  console.log('currentIndex', currentIndex);
});
