import { mainPage } from "../index.js";

function questionPage(quiz) {
  document.querySelector(".search").innerHTML = ``;
  document.querySelector("main").innerHTML = `
    <div class="question-container">
    </div>
  `;

  fetch(`${window.API}/quiz/QuestionSearch/${quiz.quiz_ID}/1`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Wrong input");
      }
    })
    .then((data) => {
      console.log(data);
      document.querySelector(".question-container").innerHTML = `
        <div class="question-box">
          <p>${quiz.title + quiz.quiz_ID}</p>
          <img class="question-image" src="${quiz.image}" width="200" height="200">
          <p class="question-under-text">${quiz.description}</p>
          <p class="question-under-text">${quiz.username}</p>
          <p class="question-under-text">${data.data[0].question}</p>
          <p class="question-under-text">${data.data[0].choice}</p>
          <p class="question-under-text">${data.data[0].correct_answer}</p>
        </div>
      `;
    })
    .catch((error) => {
      console.log(error);
      mainPage();
    });
}

export { questionPage };
