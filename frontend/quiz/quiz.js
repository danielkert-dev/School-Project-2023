import { questionPage } from "../question/question.js";

function quizPage(page, pageSize) {
  fetch(`${window.API}/quiz/SearchAll/${page}/${pageSize}`, {
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
      let quizID = [];
      document.querySelector("main").innerHTML = `
            <div class="quiz-container"></div>
            `;

      for (let i = 0; i < data.data.length; i++) {
        document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box" id="quiz-box-${i}">
            <p>${data.data[i].title}</p>
            <img class="quiz-image" id="quiz-image-${i}" src="${data.data[i].image}">
            <p class="quiz-under-text">${data.data[i].description}</p>
            <p class="quiz-under-text">${data.data[i].username}</p>
            </div>
            `;
        quizID.push(data.data[i]);
        document.querySelector(".page-number").value =
          parseInt(localStorage.getItem("page")) + 1;
      }

      setTimeout(() => {
        for (let i = 0; i < quizID.length; i++) {
          document
            .querySelector(`#quiz-box-${i}`)
            .addEventListener("click", () => {
              transition();
              setTimeout(() => {
                questionPage(quizID[i]);
              }, 100);
            });
        }
      }, 200);

      setTimeout(() => {
        for (let i = 0; i < 20 - data.data.length; i++) {
          document.querySelector(".quiz-container").innerHTML += `
                <div class="quiz-box-empty">
                Quiz
                </div>
                `;
        }
      }, 100);
    })
    .catch((error) => {
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

function transition() {
  document.querySelector("main").style.opacity = "0";
  setTimeout(() => {
    document.querySelector("main").style.opacity = "1";
  }, 300);
}

export { quizPage };
