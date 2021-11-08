import { questionsData } from '../../quiz/js/state';

const templateQuestion = ({ index, title, image }) => {
  const imageHtml = (
    `
      <a class="quiz-test__question-picture" href="${image}" target="_blank">
        <picture class="quiz-test__question-picture-picture">
          <img
            class="quiz-test__question-picture-img"
            src="${image}"
            alt=""
            width="280"
            height="158"
          >
        </picture>
      </a>
    `
  );

  return (
    `
      <div class="quiz-test__question">
        <h2 class="quiz-test__question-title">Задание ${index + 1}</h2>
        <p class="quiz-test__question-question">${title}</p>
        ${image ? imageHtml : ''}
      </div>
    `
  );
};

const templateControl =  ({ questionId, id, type }) => {
  const markHtml = (
    `
      <svg class="field-checkbox__box-mark" width="16" height="12" viewBox="0 0 16 12">
        <path d="M5.95883 11.4879L15.2047 2.3163C15.4567 2.06628 15.4583 1.65925 15.2083 1.40714L14.001 0.190103C13.751 -0.0619501 13.344 -0.0635574 13.0919 0.18646L5.51949 7.69803L2.31635 4.46891C2.06633 4.2168 1.65929 4.21519 1.40724 4.46521L0.19015 5.6725C-0.0619568 5.92257 -0.0635639 6.3296 0.186454 6.58166L5.04972 11.4843C5.29974 11.7364 5.70677 11.738 5.95883 11.4879Z"></path>
      </svg>
    `
  );

  return (
    `
      <input
        class="field-${type}__input"
        type="${type}"
        name="control_${questionId}"
        data-id="${id}"
      >
      <span class="field-${type}__box">
        ${type === 'checkbox' ? markHtml : ''}
      </span>
    `
  );
};

const templateAnswer = ({ questionId, id, type, title, image }) => {
  const imageHtml = (
    `
      <a class="quiz-test__answer-picture" href="${image}" target="_blank">
        <picture class="quiz-test__answer-picture-picture">
          <img
            class="quiz-test__answer-picture-img"
            src="${image}"
            alt=""
            width="212"
            height="120"
          >
        </picture>
      </a>
    `
  );

  const controlHtml = templateControl({ questionId, id, type });

  return (
    `
      <div class="quiz-test__answer">
        <label class="field-${type} quiz-test__answer-control">
          ${controlHtml}
          <span class="field-${type}__label">
            ${title}
            <span class="field-${type}__feedback"></span>
          </span>
        </label>

        ${image ? imageHtml : ''}
      </div>
    `
  );
};

const templateItem = ({ index, id, type, title, image, answers }) => {
  const questionHtml = templateQuestion({ index, title, image });
  const answersHtml = Object.entries(answers)
    .map((answer) => templateAnswer({ type, questionId: id, id: answer[0],  ...answer[1] }))
    .join('');

  return (
    `
      <div class="quiz-test__item quiz-test__item_hide" data-answered="false">
        ${questionHtml}
        <div class="quiz-test__answers">${answersHtml}</div>
      </div>
    `
  );
};

const appendItems = (questionsData) => {
  const itemsNode = document.querySelector('.quiz-test__items');
  if (!itemsNode) return;

  const itemsHtml = questionsData
    .map((question, index) => templateItem({ index, ...question }))
    .join('');

  itemsNode.insertAdjacentHTML('beforeend', itemsHtml);
};

appendItems(questionsData);
