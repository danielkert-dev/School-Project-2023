import { mainPage, transition } from "../index.js";

function questionPage(quiz) {
  let quizID = localStorage.getItem("quizID");
  let question = localStorage.getItem("question");

  document.querySelector(".search").innerHTML = ``;
  document.querySelector("main").innerHTML = `
    <div class="question-container">
    </div>
  `;

  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";

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
        // If its last
        document.querySelector(".question-container").innerHTML = `
        <div class="question-box">

        <div class="question-controls">
          <button class="back-button">Back</button>
          <button class="end-button">End</button>
          </div>

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
          userPointsAdd();
          setTimeout(() => {
            document.querySelector("header").style.display = "flex";
            document.querySelector("footer").style.display = "flex";
            mainPage();
          }, 200);
        });
      } else {
        // If not last
        document.querySelector(".question-container").innerHTML = `
        <div class="question-box">
        <div class="question-controls">
          <button class="back-button">Back</button>
          <button class="end-button">End</button>
          </div>

          <p class="question-title">${quiz.title}</p>
          <p class="question-question">${data.data[0].question}</p>

          <img class="question-image" src="${data.data[0].image}">
          <p class="question-under-text">${data.data[0].description}<br>${quiz.username}</p>
          <div class="question-choices">
          </div>
        </div>
      `;

        document.querySelector(".back-button").addEventListener("click", () => {
          document.querySelector("header").style.display = "flex";
          document.querySelector("footer").style.display = "flex";
          mainPage();
        })

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
          userPointsAdd();
          setTimeout(() => {
            questionPage(quiz);
          }, 200);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      document.querySelector("header").style.display = "flex";
      document.querySelector("footer").style.display = "flex";
      mainPage();
    });
}

function userPointsAdd() {
  let username = localStorage.getItem("username");

  fetch(`${window.API}/user/SearchByUsername/${username}`, {
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
      let userID = data.data[0].ID;
      console.log(userID);

      fetch(`${window.API}/user/PointsAdd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: userID,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No points added");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
      document.querySelector("header").style.display = "flex";
      document.querySelector("footer").style.display = "flex";
      mainPage();
    });
}

export { questionPage };
