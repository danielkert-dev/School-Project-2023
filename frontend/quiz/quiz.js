import { questionPage } from "../question/question.js";
import { transition } from "../index.js";

async function quizPage(page, pageSize) { // List all quizzes
  window.scrollTo(0, 0);
  fetch(`${window.API}/quiz/SearchAll/${page}/${pageSize}`, { // Get all quizzes in API
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No page found");
      }
    })
    .then((data) => {
      console.log(data);
      let quizID = []; // Fill the page
      document.querySelector("main").innerHTML = `
            <div class="quiz-container">
            </div>
            `;

      for (let i = 0; i < data.data.length; i++) {

        if (data.data[i].disabled === 1) { // If the quiz is disabled then don't show
          continue;
        } 
        // Fill the page
        document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box" id="quiz-box-${i}">
            <p>${data.data[i].title}</p>
            <img class="quiz-image" id="quiz-image-${i}" src="${data.data[i].image}">
            <p class="quiz-under-text">Played : ${data.data[i].amount_done}</p>
            <p class="quiz-under-text">By ${data.data[i].username}</p>
            <span>${data.data[i].description}</span>
            </div>
            `;
        quizID.push(data.data[i]);

        document.querySelector(".page-number").value =
          parseInt(localStorage.getItem("page")) + 1; // -`????
      }

      setTimeout(() => {
        for (let i = 0; i < quizID.length; i++) { // Add event listeners to go to quiz
          document.querySelector(`#quiz-box-${i}`).addEventListener("click", () => {
              transition();
              localStorage.setItem("quizID", quizID[i].quiz_ID);
              localStorage.setItem("question", 1);
              localStorage.setItem("score", 0);
              setTimeout(() => {
                questionPage(quizID[i]);
              }, 100);
            });
        }
      }, 200);

      setTimeout(() => {
        for (let i = 0; i < 20 - data.data.length; i++) { // Add empty quizzes
          document.querySelector(".quiz-container").innerHTML += `
                <div class="quiz-box-empty">
                Quiz
                </div>
                `;
        }
      }, 100);
    })
    .catch((error) => {
      document.querySelector("main").innerHTML = ``;
      console.log(error);
      document.querySelector("main").innerHTML += `
            <div class="quiz-container"></div>
            `;
      for (let i = 0; i < 20; i++) {
        document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box-empty">
            Quiz
            </div>
            `;
        document.querySelector(".page-number").value =
          parseInt(localStorage.getItem("page")) + 1;
      }
    });
}


export { quizPage };
