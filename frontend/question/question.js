import { mainPage } from "../index.js";
import { transition } from "../index.js";

function questionPage(quiz) {
  let quizID = localStorage.getItem("quizID");
  let question = localStorage.getItem("question");

  document.querySelector(".search").innerHTML = ``;
  document.querySelector("main").innerHTML = `
    <div class="question-container">
    </div>
  `;

  fetch(`${window.API}/quiz/QuestionSearch/${quiz.quiz_ID}/${question}`, {
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

      if (data.data[0].last === 1) {
        document.querySelector(".question-container").innerHTML = `
        <div class="question-box">
          <p class="question-title">${quiz.title}</p>
          <p class="question-question">${data.data[0].question}</p>

          <img class="question-image" src="${data.data[0].image}">
          <p class="question-under-text">${data.data[0].description}<br>${quiz.username}</p>
          <div class="question-choices">
          </div>
        </div>
      `;

        let choices = data.data[0].choice.split(";");
        for (let i = 0; i < choices.length; i++) {
          console.log(choices[i]);
          document.querySelector(".question-choices").innerHTML += `
        <button id="choice-${i}" class="last-button">${choices[i]} </button>
        `;
        }

        document.querySelector(".last-button").addEventListener("click", () => {
          // Result page
          transition();
          setTimeout(() => {
            mainPage();
          }, 200);
        });
      } else {
        document.querySelector(".question-container").innerHTML = `
        <div class="question-box">
          <p class="question-title">${quiz.title}</p>
          <p class="question-question">${data.data[0].question}</p>

          <img class="question-image" src="${data.data[0].image}">
          <p class="question-under-text">${data.data[0].description}<br>${quiz.username}</p>
          <div class="question-choices">
          </div>
        </div>
      `;

        let choices = data.data[0].choice.split(";");
        for (let i = 0; i < choices.length; i++) {
          console.log(choices[i]);
          document.querySelector(".question-choices").innerHTML += `
        <button id="choice-${i}" class="next-button">${choices[i]} </button>
        `;
        }

        document.querySelector(".next-button").addEventListener("click", () => {
          localStorage.setItem("question", parseInt(question) + 1);
          transition();
          setTimeout(() => {
            questionPage(quiz);
          }, 200);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      mainPage();
    });
}

export { questionPage };
