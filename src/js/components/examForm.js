import lightGallery from "lightgallery";
import lgZoom from 'lightgallery/plugins/zoom';
import {questionTwo, responseLocalhost, dataTwo} from "./examData";

let parentFormResult = document.querySelector('.exam-form__form-result');
let parentForm = document.querySelector('.exam-form__form')

let trueAnswer = []
let typeQuest
// Рендер формы examData

let formPathname = window.location.pathname
let exemURL = window.location.pathname

const fetchHead = {
  'X-WP-Nonce': window.rest_auth?.nonce,
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

let serverQuestionRender = []

if (window.location.hostname == 'localhost' &&
    ~window.location.patname.indexOf('exam-page.html')) {

  RenderServerData(questionTwo, serverQuestionRender)
  if (document.querySelector('.exam-module-title'))
    document.querySelector('.exam-module-title').innerHTML = dataTwo.common.course_lesson.title
  if (document.querySelector('.quantity-question'))
    document.querySelector('.quantity-question').innerHTML = dataTwo.common.questions_count
  renderFormQuiz(serverQuestionRender, parentForm, parentFormResult, formPathname, exemURL)

} else {

  if (document.querySelector('.exam-form') !== null) {
    RenderServerData(window.pageData.quiz.questions, serverQuestionRender)
    document.querySelector('.exam-module-title').innerHTML = window.pageData.quiz.common.course_lesson.title
    document.querySelector('.quantity-question').innerHTML = window.pageData.quiz.common.questions_count
    renderFormQuiz(serverQuestionRender, parentForm, parentFormResult, formPathname, exemURL)
  }
}

function RenderServerData(serverData, newDataArray) {
  Object.keys(serverData).forEach(function (key) {
    newDataArray.push(this[key])
  }, serverData);

  newDataArray.map((i, q) => {
    let keyQuestionRender = ++q

    i.answers.map((k, p) => {
      k.key = ++p
      k.keyQuestion = keyQuestionRender
    });
  })
}

function renderFormQuiz(arrayQuestion, bodyForm, bodyResult, urlForm, setURL) {

  startQuestionBtn.addEventListener('click', function () {
    document.querySelector('.exam-form .exam-module__blocks').style.display = "none"
    document.querySelector('.exam-form .exam-module-title').style.display = "none"
    document.querySelector('.exam-form__form').style.display = "block"
  })

  arrayQuestion.map((i, q) => {
    // Заголовок теста
    let numberSrverQuest = ++q
    window.question_id = Object.keys(window.pageData.quiz.questions)[q - 1]

    let NumberQuestion = document.createElement('li');
    NumberQuestion.innerHTML = `<p id='itemNumberQuest'>${numberSrverQuest}</p>`;
    NumberQuestion.setAttribute('question-number', numberSrverQuest)
    bodyResult.append(NumberQuestion)

    // Тело теста
    let formBody = document.createElement('div')
    formBody.className = 'exam-form__body'
    formBody.setAttribute('id-question', numberSrverQuest)
    formBody.setAttribute('data-question-id', question_id)
    bodyForm.append(formBody)

    // Номер и текст вопроса
    let formQuestion = document.createElement('div')
    formQuestion.className = 'exam-form__form-question'
    formBody.append(formQuestion)

    let questionTitle = document.createElement('p');
    questionTitle.className = 'form-question__title';
    questionTitle.innerHTML = `Задание ${numberSrverQuest}`;
    let questionSubtitle = document.createElement('p');
    questionSubtitle.className = 'form-question__subtitle';
    questionSubtitle.innerHTML = i.title;

    formQuestion.append(questionTitle)
    formQuestion.append(questionSubtitle)

    if (i.image != '') {
      let questionImg = document.createElement('img');
      let questionImgContainer = document.createElement('div')
      questionImg.className = 'form-question__img'
      questionImgContainer.setAttribute('id', 'form-question__img-gallery')
      questionImgContainer.setAttribute('data-lg-size', '1600-2400')
      questionImg.setAttribute('src', i.image)
      questionImgContainer.append(questionImg)
      formQuestion.appendChild(questionImgContainer)
    }

    // Ответы на вопросы
    let formAnswer = document.createElement('div')
    formAnswer.className = 'exam-form__form-answer'
    formBody.append(formAnswer)

    // Тип вопросов
    typeQuest = i.type

    i.answers.map((k) => {
      let answerItem = document.createElement('div')
      let answerInput = document.createElement('input')
      let answerLabel = document.createElement('label')
      let answerDescription = document.createElement('p')
      let answerImg = document.createElement('img')
      let answerImgContainer = document.createElement('div')

      answerItem.setAttribute('answer-num', k.key)

      answerImgContainer.setAttribute('id', `answerImgContainer-galery${k.id}`)

      if (typeQuest == 'radio') {
        answerInput.setAttribute('type', 'radio')
      } else {
        answerInput.setAttribute('type', 'checkbox')
      }

      answerInput.setAttribute('name', `question${i.key}`)
      answerInput.setAttribute('question-number', k.keyQuestion)
      answerInput.setAttribute('anwerID', k.id)
      answerLabel.innerHTML = `<p>${k.title}</p>`


      if (k.result) {
        if (typeQuest == 'radio') {
          trueAnswer.push({trueAnswerNumber: [k.key], trueAnswerQuestion: k.keyQuestion})
        } else {
          let trueAnswersMultipleOption = []
          trueAnswersMultipleOption.push(k.key)
          trueAnswer.push({trueAnswerNumber: trueAnswersMultipleOption, trueAnswerQuestion: k.keyQuestion})
        }

        let finalQuestion = trueAnswer.reduce((m, o) => {
          let found = m.find(p => p.trueAnswerQuestion === o.trueAnswerQuestion);
          if (found) {
            found.trueAnswerNumber.push(+`${o.trueAnswerNumber}`)

          } else {
            m.push(o);
          }
          return m;
        }, []);

        trueAnswer = finalQuestion
      }


      answerDescription.innerHTML = k.description
      answerDescription.className = 'description-answer'

      if (k.images_url) {
        answerImg.className = 'description-img'
        answerImg.setAttribute('src', k.images_url)
        answerImgContainer.prepend(answerImg)
        answerItem.prepend(answerImgContainer)
      }

      answerItem.prepend(answerDescription)
      answerItem.append(answerLabel)
      answerLabel.append(answerInput)

      formAnswer.append(answerItem)
      answerInput.className = `answerNum${k.key}`
    });
  });

  // Добавляем кнопку в форму
  let button = document.createElement('button')
  button.className = 'btn-primary'
  button.innerHTML = 'Ответить'
  bodyForm.append(button)

  lightGallery(document.getElementById('form-question__img-gallery'), {
    plugins: [lgZoom],
    speed: 300,
    mobileSettings: {
      download: false,
    },
  })

  serverQuestionRender.map((i) => {
    i.answers.map((k) => {
      lightGallery(document.getElementById(`answerImgContainer-galery${k.id}`), {
        plugins: [lgZoom],
        speed: 300,
        mobileSettings: {
          download: false,
        },
      })
    })
  })

  // Номер вопроса
  let numQuest = 1

  // Выбор ответа
  let answerUser = []
  let answersUser = []

  let answersUserCheckbox = []

  let id_answer

  let click_input = false

  window.addEventListener('click', function (e) {
    question_id = document.querySelector('.active-formExam').getAttribute('data-question-id')

    if (e.target.localName == 'input') {
      click_input = true
      if (e.target.getAttribute('type') == 'radio') {
        answersUser = []
        answersUser.push({
          answer: [e.target.getAttribute('anwerid')],
          questionNumber: e.target.getAttribute('question-number')
        })
        id_answer = e.target.getAttribute('anwerid')
      }
      if (e.target.getAttribute('type') == 'checkbox') {
        answersUser = []
        if (e.target.checked) {
          answersUserCheckbox.push(+e.target.getAttribute('anwerid'));
          answersUserCheckbox.sort()
        } else {
          const index = answersUserCheckbox.indexOf(+e.target.className.slice(-1))
          if (index > -1) {
            answersUserCheckbox.splice(index, 1).sort();
          }
          answersUserCheckbox.sort()
        }
        answersUser.push({answer: answersUserCheckbox, questionNumber: e.target.getAttribute('question-number')})
      }
    }
  })

  let falseAnswerNumber = []

  window.answersFailed = []
  window.answersSuccess = []

  document.querySelector(`div[id-question="${numQuest}"]`).classList.add('active-formExam')
  button.addEventListener('click', function (e) {

    e.preventDefault()

    if (click_input) {

      if (answersUser === null) {
        return null;
      }

      let step = +answersUser[0].questionNumber - 1

      document.querySelector(`li[question-number="${answersUser[0].questionNumber}"]`).classList.add('perfect')
      button.style.display = 'none'

      answerUser.push(answersUser[0])

      let allDot = document.querySelectorAll(`.exam-form__body[id-question="${answersUser[0].questionNumber}"] .exam-form__form-answer div`)
      for (let i = 0; i < allDot.length; i++) {
        allDot[i].classList.add('questionActive')
      }

      let allInput = document.querySelectorAll(`.exam-form__body[id-question="${answersUser[0].questionNumber}"] input[type="radio"`)

      for (let i = 0; i < allInput.length; i++) {
        allInput[i].setAttribute('disabled', 'disabled')
      }

      let maxQuestion = document.querySelectorAll('.exam-form__body').length
      for (let i = 1; i <= maxQuestion; i++) {
        document.querySelector(`div[id-question="${i}"]`).classList.remove('active-formExam')
      }

      let testLength = document.querySelectorAll('.exam-form__body').length

      if (answersUser[0].questionNumber == testLength) {
        buttonExitExam.style.display = 'block'
      } else {
        numQuest++
        if (document.querySelector(`div[id-question="${numQuest}"]`).getAttribute('id-question') == numQuest) {
          document.querySelector(`div[id-question="${numQuest}"]`).classList.add('active-formExam')
        }
        button.style.display = 'block'

        let paragraphDescription = document.querySelectorAll('.description-answer')
        for (let i = 0; i < paragraphDescription.length; i++) {
          paragraphDescription[i].style.display = 'none'
        }
      }

      if (window.location.hostname !== 'localhost') {
        let dataRequest = {
          question_id: id_answer,
          session_hash: window.pageData.quiz.common.session_hash,
          answers: answersUser[0].answer
        }

        let answers_ids =
            Object.values(answersUser)
                .map(answerBlock => "&answers%5B%5D=" + answerBlock.answer)
                .join('')

        answersUser = [];
        answersUserCheckbox = [];

        fetch('/wp-json/quiz/v1/check-question/', {
          method: 'post',
          headers: fetchHead,
          body:
              `question_id=${question_id}` +
              `${answers_ids}` +
              `&session_hash=${window.pageData.quiz.common.session_hash}`
        })
            .then(response => response.json())
            .then(json => {

              window.quiz_result = json;

              if (json.answers && json.answers.failed) {
                answersFailed = json.answers.failed
              } else {
                answersFailed = []
              }

              if (json.answers && json.answers.success) {
                answersSuccess = json.answers.success
              } else {
                answersSuccess = []
              }

              if (json.answers) {
                buttonExitExam.click()
              }
            })
        // .catch(error => {
        //   document.querySelector('.exam-form__form-result').innerHTML = ''
        //   document.querySelector('.exam-form__body').innerHTML = ''
        //   nextQueststion.style.display = 'none'
        //   let titleError = document.createElement('p')
        //   titleError.innerHTML = 'Тест не загрузился, попробуйте позже'
        //   document.querySelector('.exam-form__form-result').append(titleError)
        // })
      } else {
        answersFailed = responseLocalhost.answers.failed
        answersSuccess = responseLocalhost.answers.success
      }
    }
  })

  let buttonExitExam = document.createElement('button')
  buttonExitExam.className = 'btn-primary'
  buttonExitExam.innerHTML = "Проверка ответов..."
  buttonExitExam.style.display = 'none'
  buttonExitExam.style.opacity = 0
  bodyForm.append(buttonExitExam)

  buttonExitExam.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('.exam-form__form').style.display = 'none';

    document.querySelector('.tests').style.display = 'block';

    answersFailed.map((i) => {
      let containerFalseAnswer = document.createElement('div')
      containerFalseAnswer.className = 'tests__questions_miss-errors'
      let newTire = document.createElement('div')
      newTire.className = 'tests__questions_miss-line'
      let textErrorAnswer = document.createElement('div')
      textErrorAnswer.className = 'tests__questions_miss-error'
      textErrorAnswer.innerHTML = `${i}`

      containerFalseAnswer.append(newTire)
      containerFalseAnswer.append(textErrorAnswer)

      document.querySelector('.tests__questions_miss-error').append(containerFalseAnswer)
    })

    if (answersFailed.length == 0) {
      document.querySelector('.tests__questions_miss-title').style.display = 'none'
    }

    let listQuestionPerfect = document.querySelectorAll('.exam-form__form-result li')
    let countPerfercty = 0
    for (let i = 0; i < listQuestionPerfect.length; i++) {
      if (listQuestionPerfect[i].classList[0] == 'perfect') {
        countPerfercty++
      }
    }

    let result_title_block = document.querySelector('.tests__container-title')

    if (window.quiz_result.completing_status === 'success') {
      document.querySelector('.tests__questions_miss-result').style.color = 'green'

      if (window.pageData.next_webinar_link) {

        nextModul.innerHTML = 'Следующий урок'
        nextModulDesk.innerHTML = 'Следующий урок'
        nextModul.textContent = 'Следующий урок'
        nextModulDesk.textContent = 'Следующий урок'

        nextModul.addEventListener('click', _ => location.href = window.pageData.next_webinar_link)
        nextModulDesk.addEventListener('click', _ => location.href = window.pageData.next_webinar_link)

        nextModul.style.display = 'block'
        nextModulDesk.style.display = 'block'
      }

      result_title_block.textContent = 'Вы успешно прошли тест! ' + result_title_block.textContent
    } else {
      result_title_block.textContent = 'Вы не прошли тест. ' + result_title_block.textContent
      nextModul.addEventListener('click', _ => location.reload())
      nextModulDesk.addEventListener('click', _ => location.reload())
      document.querySelector('.tests__questions_miss-result').style.color = 'red'
    }

    let buttonRestart = document.createElement('a')
    buttonRestart.className = 'restart-button'
    buttonRestart.innerHTML = 'Попробовать еще раз'
    document.querySelector('.tests__questions_miss').append(buttonRestart)
    buttonRestart.addEventListener('click', _ => location.reload())
    buttonRestart.style.display = 'block'

    document.querySelector('.tests__questions_miss-result').innerHTML =
        `${answersSuccess.length} из ${listQuestionPerfect.length}`
  })
}

function array_compare(a, b) {
  if (a.length != b.length)
    return false;

  for (let i = 0; i < a.length; i++)
    if (a[i] != b[i])
      return false;

  return true;
}

