import { showBox } from '../quiz/quiz';

const startNode = document.querySelector('.quiz-preview__start');

if (startNode) {
  startNode.addEventListener('click', () => showBox(1));
}
