import { mainPage, transition } from "../index.js";
import { resultPage } from "../result/result.js";


function questionPage(quiz) {
  window.scrollTo(0, 0);
  let question = localStorage.getItem("question");

  // Fill the page
  document.querySelector(".search").innerHTML = ``;
  document.querySelector("main").innerHTML = `
    <div class="question-container">
    </div>
  `;

  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";

  fetch(`${window.API}/quiz/QuestionSearch/${quiz.quiz_ID}/${question}`, { // Get the question in API
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      if (data.data[0].last === 1) {
        // If last fill the page
        document.querySelector(".question-container").innerHTML = `
        <div class="question-box">
        <div class="question-controls">
          <button class="back-button">Back</button>
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

        // List the choices and then make them buttons
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
            
            // Make the button reactive and if it is the correct answer make it green else make it red
            
            let answer = data.data[0].correct_answer.split(";");
            answer = answer.map(Number);
            let choice = i + 1;
           
            document.querySelector(`#choice-${i}`).addEventListener("click", () => {

                
                if (answer.includes(choice)) {

                  document.querySelector(`#choice-${i}`).classList = "correct";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.opacity = ".6";
                  document.querySelector(".question-choices").style.userSelect = "none";
                  document.querySelector(".continue-button").style.opacity = "1";
                  document.querySelector(".continue-button").addEventListener("click", () => {
                    correctLast(question, quiz);
                  })
                } else {
                  document.querySelector(`#choice-${i}`).classList = "wrong";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.opacity = ".6";
                  document.querySelector(".question-choices").style.userSelect = "none";
                  document.querySelector(".continue-button").style.opacity = "1";
                  document.querySelector(".continue-button").addEventListener("click", () => {
                    wrongLast(question, quiz);
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

        // List the choices and then make them buttons
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
            
            // Make the button reactive and if it is the correct answer make it green else make it red
            let answer = data.data[0].correct_answer.split(";");
            answer = answer.map(Number);
            let choice = i + 1;
           
            document.querySelector(`#choice-${i}`).addEventListener("click", () => {

                
                if (answer.includes(choice)) {

                  document.querySelector(`#choice-${i}`).classList = "correct";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.opacity = ".6";
                  document.querySelector(".question-choices").style.userSelect = "none";
                  document.querySelector(".continue-button").style.opacity = "1";
                  document.querySelector(".continue-button").addEventListener("click", () => {
                    correct(question, quiz);
                  })
                } else {
                  document.querySelector(`#choice-${i}`).classList = "wrong";
                  document.querySelector(".question-choices").style.pointerEvents = "none";
                  document.querySelector(".question-choices").style.opacity = ".6";
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
    .catch((error) => { // If error
      console.log(error);
      document.querySelector("header").style.display = "flex";
      document.querySelector("footer").style.display = "flex";
      mainPage();
    });
}

function userPointsAdd() { // Add points to user
  let username = localStorage.getItem("username");

  fetch(`${window.API}/user/SearchByUsername/${username}`, { // Get user by username
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
      let userID = data.data[0].ID; // This is needed from the fetch

      fetch(`${window.API}/user/PointsAdd`, { // Add points to the user
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

function correct(question, quiz) { // Correct answer
  localStorage.setItem("correct", localStorage.getItem("correct") + localStorage.getItem("question") + ";");
  localStorage.setItem("question", parseInt(question) + 1);
  localStorage.setItem("score", parseInt(localStorage.getItem("score")) + 1);
  transition();
  userPointsAdd();
  setTimeout(() => {
    questionPage(quiz);
  }, 100);
}

function wrong(question, quiz) { // Wrong answer
  localStorage.setItem("question", parseInt(question) + 1);
  transition();
  setTimeout(() => {
    questionPage(quiz);
  }, 100);
}

function correctLast(question) { // Correct answer last
  localStorage.setItem("correct", localStorage.getItem("correct") + localStorage.getItem("question") + ";");
  localStorage.setItem("question", parseInt(question) + 1);
  localStorage.setItem("score", parseInt(localStorage.getItem("score")) + 1);
  transition();
  userPointsAdd();
  setTimeout(() => {
    resultPage();
  }, 100);
}

function wrongLast(question) { // Wrong answer last
  localStorage.setItem("question", parseInt(question) + 1);
  transition();
  setTimeout(() => {
    resultPage();
  }, 100);
}

export { questionPage };
