import testData from '../quiz.json';
import { CHANGE_CURRENT_INDEX, observerCurrentIndex } from './observer';

const data = window.pageData?.quiz_v4 || testData;

const getQuestionsData = (data) => (
  Object.values(data.questions).sort((a, b) => a.id - b.id)
);

let currentIndex = 0;
let prevIndex = null;
const questionsData = getQuestionsData(data);

const setCurrentIndex = (value) => {
  if (value < 0) value = 0;
  if (value >= questionsData.length) value = questionsData.length - 1;

  prevIndex = Number(currentIndex);
  currentIndex = Number(value);

  observerCurrentIndex.trigger(CHANGE_CURRENT_INDEX);
};

export {
  currentIndex,
  prevIndex,
  setCurrentIndex,
  questionsData,
};
