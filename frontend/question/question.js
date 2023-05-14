import { mainPage, transition } from "../index.js";
import { resultPage } from "../result/result.js";


function questionPage(quiz) {
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
      if (data.data[0].last === 1) {
        // If last
        document.querySelector(".question-container").innerHTML = `
        <div class="question-box">
        <div class="question-controls">
          <button class="back-button">Back</button>
          <button class="end-button">End</button>
          <button class="continue-button">Next</button>
          </div>

          <p class="question-title">${quiz.title}</p>
          <p class="question-question">${data.data[0].question}</p>

          <img class="question-image" src="${data.data[0].image}">
          <p class="question-under-text">${data.data[0].description}<br>${quiz.username}</p>
          <div class="question-choices">
          </div>
        </div>
      `;

      document.querySelector(".continue-button").style.opacity = ".6";

        document.querySelector(".back-button").addEventListener("click", () => {
          document.querySelector("header").style.display = "flex";
          document.querySelector("footer").style.display = "flex";
          mainPage();
        });

        let choicesList = [];

        let choices = data.data[0].choice.split(";");
        for (let i = 0; i < choices.length; i++) {
          document.querySelector(".question-choices").innerHTML += `
        <button id="choice-${i}" class="next-button">${choices[i]} </button>
        `;
          choicesList.push(choices[i]);
        }

        setTimeout(() => {
          for (let i = 0; i < choicesList.length; i++) {
            document.querySelector(`#choice-${i}`).addEventListener("click", () => {
                let answer = data.data[0].correct_answer;
                let choice = i + 1;
                if (answer === choice) {
                  document.querySelector(`#choice-${i}`).classList = "correct";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.userSelect = "none";
                  document.querySelector(".continue-button").style.opacity = "1";
                  document.querySelector(".continue-button").addEventListener("click", () => {
                    correctLast(question);
                  })
                } else {
                  document.querySelector(`#choice-${i}`).classList = "wrong";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.userSelect = "none";
                  document.querySelector(".continue-button").style.opacity = "1";
                  document.querySelector(".continue-button").addEventListener("click", () => {
                    wrongLast(question);
                  })
                }
              });
          }
        }, 100);
           
      
      } else {
        // If not last
        document.querySelector(".question-container").innerHTML = `
        <div class="question-box">
        <div class="question-controls">
          <button class="back-button">Back</button>
          <button class="end-button">End</button>
          <button class="continue-button">Next</button>
          </div>

          <p class="question-title">${quiz.title}</p>
          <p class="question-question">${data.data[0].question}</p>

          <img class="question-image" src="${data.data[0].image}">
          <p class="question-under-text">${data.data[0].description}<br>${quiz.username}</p>
          <div class="question-choices">
          </div>
        </div>
      `;

        document.querySelector(".continue-button").style.opacity = ".6";

        document.querySelector(".back-button").addEventListener("click", () => {
          document.querySelector("header").style.display = "flex";
          document.querySelector("footer").style.display = "flex";
          mainPage();
        });

        let choicesList = [];

        let choices = data.data[0].choice.split(";");
        for (let i = 0; i < choices.length; i++) {
          document.querySelector(".question-choices").innerHTML += `
        <button id="choice-${i}" class="next-button">${choices[i]} </button>
        `;
          choicesList.push(choices[i]);
        }

        setTimeout(() => {
          for (let i = 0; i < choicesList.length; i++) {
            document.querySelector(`#choice-${i}`).addEventListener("click", () => {
                let answer = data.data[0].correct_answer;
                let choice = i + 1;
                if (answer === choice) {
                  document.querySelector(`#choice-${i}`).classList = "correct";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.userSelect = "none";
                  document.querySelector(".continue-button").style.opacity = "1";
                  document.querySelector(".continue-button").addEventListener("click", () => {
                    correct(question, quiz);
                  })
                } else {
                  document.querySelector(`#choice-${i}`).classList = "wrong";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.userSelect = "none";
                  document.querySelector(".continue-button").style.opacity = "1";
                  document.querySelector(".continue-button").addEventListener("click", () => {
                    wrong(question, quiz);
                  })
                }
              });
          }
        }, 100);
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
          console.log("Points added");
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

function correct(question, quiz) {
  localStorage.setItem("question", parseInt(question) + 1);
  transition();
  userPointsAdd();
  setTimeout(() => {
    questionPage(quiz);
  }, 100);
}

function wrong(question, quiz) {
  localStorage.setItem("question", parseInt(question) + 1);
  transition();
  setTimeout(() => {
    questionPage(quiz);
  }, 100);
}

function correctLast(question) {
  localStorage.setItem("question", parseInt(question) + 1);
  transition();
  userPointsAdd();
  setTimeout(() => {
    resultPage();
  }, 100);
}

function wrongLast(question) {
  localStorage.setItem("question", parseInt(question) + 1);
  transition();
  setTimeout(() => {
    resultPage();
  }, 100);
}

export { questionPage };
