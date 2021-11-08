import { currentIndex, prevIndex, setCurrentIndex, questionsData } from '../../quiz/js/state';
import { CHANGE_CURRENT_INDEX, observerCurrentIndex } from '../../quiz/js/observer';
import { showTestItem } from '../quiz-test';

const templateNavigateItem = (index) => {
  return (
    `
    <li class="quiz-test__navigate-item">
      <button
        class="quiz-test__navigate-btn"
        type="button"
        data-index="${index}"
        disabled
      >
        ${index + 1}
      </button>
    </li>
    `
  );
};

const appendNavigate = (questionsData) => {
  const navigateNode = document.querySelector('.quiz-test__navigate');
  if (!navigateNode) return;

  const innerHtml = questionsData.map((_, i) => templateNavigateItem(i)).join('');
  navigateNode.insertAdjacentHTML('beforeend', innerHtml);
};

const handleNavigateButton = (event) => {
  const button = event.currentTarget;
  const index = button.dataset.index;
  if (isNaN(index) || +index === +currentIndex) return;

  setCurrentIndex(index);
};

const addEventNavigate = () => {
  const navigateNode = document.querySelector('.quiz-test__navigate');
  if (!navigateNode) return;

  const navigateButtonNodes = navigateNode.querySelectorAll('.quiz-test__navigate-btn');

  navigateButtonNodes.forEach(button => {
    button.addEventListener('click', handleNavigateButton);
  });
};

// success || failed
const setStatusNavigateButton = (status, index) => {
  const navigateButtonNodes = document.querySelectorAll('.quiz-test__navigate-btn');
  if (!navigateButtonNodes[index]) return;

  if (status === 'success') {
    navigateButtonNodes[index].classList.add('quiz-test__navigate-btn_correctly');
  } else if (status === 'failed') {
    navigateButtonNodes[index].classList.add('quiz-test__navigate-btn_wrong');
  }
};

const activateNavigateButton = (index) => {
  const navigateButtonNodes = document.querySelectorAll('.quiz-test__navigate-btn');
  if (!navigateButtonNodes[index]) return;

  navigateButtonNodes[index].disabled = false;
};

appendNavigate(questionsData);
addEventNavigate();
activateNavigateButton(currentIndex);

observerCurrentIndex.add(CHANGE_CURRENT_INDEX, () => showTestItem(currentIndex, prevIndex));

export {
  setStatusNavigateButton,
  activateNavigateButton,
};
