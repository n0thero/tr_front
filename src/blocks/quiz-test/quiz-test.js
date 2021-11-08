import './js/items';

import { setStatusNavigateButton, activateNavigateButton } from './js/navigate';
import { currentIndex, prevIndex, setCurrentIndex } from '../quiz/js/state';
import { CHANGE_CURRENT_INDEX, observerCurrentIndex } from '../quiz/js/observer';
import { showBox } from '../quiz/quiz';
import { showResult } from '../quiz-result/quiz-result';
// import { URL_QUIZ_ANSWER } from '../../js/global/api';
const URL_QUIZ_ANSWER = 'd.json';

const testReplyNode = document.querySelector('.quiz-test__reply');
const testItemNodes = document.querySelectorAll('.quiz-test__item');

const showTestItem = (index, prevIndex) => {
  if (!testItemNodes[index]) return;
  testItemNodes[index].classList.remove('quiz-test__item_hide');

  if (!testItemNodes[prevIndex]) return;
  testItemNodes[prevIndex].classList.add('quiz-test__item_hide');
};

const setAnswerFeedback = (control, details) => {
  if (!details?.length) return;
  
  const id = control.dataset.id;
  const type = control.getAttribute('type');
  const answerFeedback = details.find((answer) => answer.id == id);
  
  if (answerFeedback) {
    const feedbackNode = control.parentElement.querySelector(`.field-${type}__feedback`);
    if (!feedbackNode) return;

    feedbackNode.textContent = answerFeedback.description;
  }
};

const sendAnswers = () => {
  const controls = Array.from(
    testItemNodes[currentIndex].querySelectorAll('.quiz-test__answer input')
  );

  testReplyNode.disabled = true;

  fetch(URL_QUIZ_ANSWER, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    // body: JSON.stringify({
    //   question_id: 1,
    //   session_hash: 1,
    //   answers_ids: [],
    // }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 'success') {
      if (data.correct_questions_count) {
        showBox(2);
        showResult(data);
        return;
      }

      testItemNodes[currentIndex].dataset.answered = true;

      controls.forEach((control) => setAnswerFeedback(control, data.answers_details));

      setCurrentIndex(currentIndex + 1);
      activateNavigateButton(currentIndex);
      showTestItem(currentIndex, prevIndex);
    } else if (data.status === 'failed') {
      alert(error.message);
    } else {
      alert('Что-то пошло не так, попробуйте отправить позднее');
    }
  })
  .catch((error) => console.error(error))
  .finally(() => {
    testReplyNode.disabled = false;
  });
};

const handleReplyNode = (event) => {
  const controls = Array.from(
    testItemNodes[currentIndex].querySelectorAll('.quiz-test__answer input')
  );

  if (testItemNodes[currentIndex].dataset.answered === 'true') {
    setCurrentIndex(currentIndex + 1);
    showTestItem(currentIndex, prevIndex);
  } else {
    const answerCheckedIds = controls
      .filter((control) => control.checked)
      .map((control) => control.dataset.id);
  
    if (!answerCheckedIds.length) return;

    controls.forEach((control) => {
      control.disabled = true;
    });

    sendAnswers(controls);
  }
};

if (testReplyNode && testItemNodes.length) {
  testReplyNode.addEventListener('click', handleReplyNode);

  observerCurrentIndex.add(CHANGE_CURRENT_INDEX, () => {
    if (testItemNodes[currentIndex].dataset.answered === 'true') {
      testReplyNode.textContent = 'Следующий вопрос';
    } else {
      testReplyNode.textContent = 'Ответить';
    }
  });
}

showTestItem(currentIndex, prevIndex);

export {
  showTestItem,
};
