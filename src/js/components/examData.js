let dataTwo = {
  "is_demo": false,
  "common": {
      "before_practice": false,
      "course": {
          "id": 1578,
          "title": "Биржа",
          "url": "https://trendup.pro/course/birzha-365/?process"
      },
      "course_lesson": {
          "id": 1566,
          "title": "Нулевой урок. Правила пользования и инструкции",
          "url": "https://trendup.pro/course/birzha-365/blok-1/urok-1-24/?process"
      },
      "current_question_position": 0,
      "current_question_position_id": 454909,
      "estimated_time": 5998,
      "questions_count": 2,
      "questions_order": [
          454909,
          454910
      ],
      "session_hash": "fjvtq8qzqxYevVWw",
      "time_for_next_session": 5
  },
  "questions": {
      "454909": {
          "title": "Поняли ли Вы систему прохождения курса?",
          "body": "",
          "image": "img/titlequest-img.png",
          "answers": [
              {
                  "id": 1764256,
                  "title": "нет",
                  "body": "",
                  "image": false,
                  "images_description": false,
                  "images_url": "img/quest-img.png",
                  "is_right": true,
                  "result_description": "123123"
              },
              {
                  "id": 1764255,
                  "title": "да",
                  "body": "",
                  "image": false,
                  "images_description": false,
                  "images_url": "img/quest-img.png",
                  "is_right": false,
                  "result_description": "123123"
              },
          ],
          "type": "radio",
          "answered": false
      },
      "454910": {
          "title": "Готовы ли вы к прохождению курса?",
          "body": "",
          "image": "",
          "answers": [
              {
                  "id": 1764258,
                  "title": "нет",
                  "body": "",
                  "image": false,
                  "images_description": false,
                  "images_url": false,
                  "is_right": false,
                  "result_description": "123123"
              },
              {
                  "id": 1764257,
                  "title": "да",
                  "body": "",
                  "image": false,
                  "images_description": false,
                  "images_url": false,
                  "is_right": true,
                  "result_description": "123123"
              }
          ],
          "type": "radio",
          "answered": false
      }
  }
};
let responseLocalhost = {
  answers: {
    failed: ["Готовы ли вы к прохождению курса?"],
    success: ["Поняли ли Вы систему прохождения курса?"]
  },
  code: "already_completed",
  common: {
    course: {id: 1578, title: "Биржа", url: "https://trendup.pro/vebinar-1-urok/"},
    course_lesson: {
      id: "1566",
      title: "Нулевой урок. Правила пользования и инструкции",
      url: "https://trendup.pro/course/birzha-365/blok-1/urok-1-24/?process"
    },
    course_lesson_end: "",
    course_lesson_start: "",
    estimated_time: 0,
    time_for_next_session: 300
  },
  completing_status: "success",
  message: "Поздравляем! Вы успешно прошли этот тест."
}

 
let questionTwo = dataTwo.questions

export {questionTwo, responseLocalhost, dataTwo}
