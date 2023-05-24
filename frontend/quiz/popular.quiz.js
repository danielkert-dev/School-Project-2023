import { questionPage } from "../question/question.js";
import { transition } from "../index.js";
import { authPage } from "../auth/auth.js";

async function quizPagePopular(page, pageSize) {
  window.scrollTo(0, 0);
  fetch(`${window.API}/quiz/SearchByAmount/${page}/${pageSize}`, { // Change the to popular endpoint
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
      let quizID = [];
      document.querySelector(".popular-page").innerHTML = `
      <h1>Popular Quizzes</h1>
            <div class="popular-quiz">
            </div>
            `;

      for (let i = 0; i < data.data.length; i++) {

        if (data.data[i].disabled === 1) {
          continue;
        } 

        document.querySelector(".popular-quiz").innerHTML += `
            <div class="quiz-box" id="quiz-box-popular-${i}">
            <h2>Rank ${i + 1}</h2>
            <p>${data.data[i].title}</p>
            <img class="quiz-image" id="quiz-image-${i}" src="${data.data[i].image}">
            <p class="quiz-under-text">Played : ${data.data[i].amount_done}</p>
            <p class="quiz-under-text">By ${data.data[i].username}</p>
            </div>
            `;
        quizID.push(data.data[i]);

        document.querySelector(".page-number").value =
          parseInt(localStorage.getItem("page")) + 1; // -`????
      }

      setTimeout(() => {
        for (let i = 0; i < quizID.length; i++) {
          document.querySelector(`#quiz-box-popular-${i}`).addEventListener("click", () => {
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

   
    })
    .catch((error) => {
      authPage();
    });
}


export { quizPagePopular };
