import { URL_USER_COURSES } from '../../../js/global/api';

const contentMainNode = document.querySelector('.index-content__main');
const contentAdminNode = document.querySelector('.index-content__admin');
const startLearnNode = document.querySelector('.start-learn-wrapper');
const coursesNode = document.querySelector('.account-courses');
const coursesListNode = document.querySelector('.account-courses__list');

const currentSearch = window.location.search;
const cookieUserIdValue = document.cookie
  .split('; ')
  .find(row => row.startsWith('trendup_user_id'))
  ?.split('=')[1];

const templateCourseCard = ({ title, img, link }) => {
  return (
    `
      <div class="account-courses__item swiper-slide">
        <article class="course-card-lg" style="background-image: url('${img}')">
          <h2 class="course-card-lg__title">${title}</h2>
          <a class="course-card-lg__link btn-primary" href="${link}">
            Начать обучение
          </a>
        </article>
      </div>
    `
  );
};

if (contentMainNode && contentAdminNode) {
  if (currentSearch === '?update') {
    if (cookieUserIdValue) {
      contentAdminNode.style.display = 'block';
    } else {
      contentMainNode.style.display = 'block';
    }
  } else {
    if (cookieUserIdValue) {
      contentAdminNode.style.display = 'block';
    } else {
      window.location.href = '/?update';
    }
  }

  if (contentAdminNode?.style?.display !== 'none' && coursesListNode) {
    fetch(`${URL_USER_COURSES}?user_id=${cookieUserIdValue}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        if (data?.courses?.length) {
          coursesNode.style.display = 'block';
          const htmlCourses = data.courses.map(templateCourseCard).join('');
          coursesListNode.insertAdjacentHTML('beforeend', htmlCourses);
        } else {
          startLearnNode.style.display = 'block';
        }
      }
    });
  }
}
