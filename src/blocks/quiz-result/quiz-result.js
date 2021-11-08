import { questionsData } from '../quiz/js/state';

const resultNode = document.querySelector('.quiz-result__result');
const infoNode = document.querySelector('.quiz-result__info');

const showIncorrectQuestions = ({ incorrect_questions }) => {
  if (!infoNode) return;
  const listNode = infoNode.querySelector('.quiz-result__info-list');

  incorrect_questions.forEach((question) => {
    const item = document.createElement('li');

    item.classList.add('quiz-result__info-item');
    item.textContent = question.title;
    listNode.appendChild(item);
  });
};

const showResult = ({
  correct_questions_count,
  incorrect_questions,
  completing_status,
}) => {
  if (resultNode) {
    const resultCurrentNode = resultNode.querySelector('.quiz-result__result-current');
    const resultAlltNode = resultNode.querySelector('.quiz-result__result-all');

    if (completing_status === 'success') {
      resultNode.classList.add('quiz-result__result_correct');
    }
    if (completing_status === 'failed') {
      resultNode.classList.add('quiz-result__result_defided');
    }

    resultCurrentNode.textContent = correct_questions_count + ' ';
    resultAlltNode.textContent = questionsData.length;

    if (incorrect_questions?.length) {
      showIncorrectQuestions({incorrect_questions});
    } else {
      if (infoNode) {
        infoNode.remove();
      }
    }
  }
};

export {
  showResult,
};
