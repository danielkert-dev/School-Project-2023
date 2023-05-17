import { mainPage, transition } from "../index.js";

// quiz/Create

function createPage() {
  userID();
  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";
  document.querySelector(".search").innerHTML = ``;

  localStorage.setItem("createQuestion", 0);

  document.querySelector("main").innerHTML = `
    <div class="create-quiz-container">

    <div class="create-header">
    <h1 class="create-title">CREATE QUIZ</h1>
    <div class="create-button-container">
    <button class="back-button">Home</button>
    </div>
    </div>

    <div class="create-body">

    <div class="create-form-quiz">
    <div class="create-alert"></div>
    <h3>Quiz</h3>
    <button class="create-button">Create Quiz</button>


    <input class="create-form-quiz-title" type="text" placeholder="Quiz Title...">
    <textarea class="create-form-quiz-description" type="text" placeholder="Quiz Description..." maxlength="58" width="100%" rows="5"></textarea>
    <input class="create-form-quiz-image" type="text" placeholder="Quiz Image URL...">


    <button class="add-question-button">Add Question</button>
    </div>

    <div class="create-form-question">
    </div>

    </div>
    </div>
  `;

  document.querySelector(".add-question-button").addEventListener("click", () => {
      questionBoxAdd();
    });
  document.querySelector(".create-button").addEventListener("click", () => {
    quizAdd();
    });
  document.querySelector(".back-button").addEventListener("click", () => {
    transition();
    setTimeout(() => {
      document.querySelector("header").style.display = "flex";
      document.querySelector("footer").style.display = "flex";
      mainPage();
    }, 100);
  });
}

function questionBoxAdd() {
  localStorage.setItem("createQuestion", parseInt(localStorage.getItem("createQuestion")) + 1);
  let questionNumber = localStorage.getItem("createQuestion");
  
  document.querySelector(".create-form-question").innerHTML += `
    <div class="create-question-box" id="create-question-${localStorage.getItem("createQuestion")}">
    <h3>Question <div class="question-number">${localStorage.getItem("createQuestion")}</div></h3>
    <input class="question-title-${localStorage.getItem("createQuestion")}" type="text" placeholder="Question Title...">
    <input class="question-image-${localStorage.getItem("createQuestion")}" type="text" placeholder="Question Image URL...">
    <div class="question-image-box" id="question-image-box-${localStorage.getItem("createQuestion")}"></div>
    <textarea class="question-description-${localStorage.getItem("createQuestion")}" type="text" placeholder="Question Description..." maxlength="58" width="100%" rows="5"></textarea>
    <textarea class="question-choices-${localStorage.getItem("createQuestion")}" type="text" placeholder="Question Choices... (Choice1; Choice2; Choice3)" maxlength="58" width="100%" rows="5"></textarea>
    <input class="question-answer-${localStorage.getItem("createQuestion")}" type="text" placeholder="Correct Answer... (1;3)">
    </div>
    `;

    console.log(questionNumber);
    // Image preview
    document.querySelector(`.question-image-${questionNumber}`).addEventListener("input", () => {
        console.log(document.querySelector(`.question-image-${questionNumber}`).value);
        console.log(questionNumber);
        setTimeout(() => {
        document.querySelector(`#question-image-box-${questionNumber}`).innerHTML = `
        <img src="${document.querySelector(`.question-image-${questionNumber}`).value}">
        <p>Image</p>
        `;
        }, 100)
    })
}

function quizAdd() {
    // All the inputs for the quiz : title, description, user_ID, image
    let title = document.querySelector(".create-form-quiz-title").value;
    let description = document.querySelector(".create-form-quiz-description").value;
    let user_ID = localStorage.getItem("user_ID");
    let image = document.querySelector(".create-form-quiz-image").value;

    console.log("Quiz_Title: '" +title+ "' Quiz_Description: '"+ description + "' User_ID: '"+ user_ID + "' Image: '"+ image + "'");

    // Fetch quiz post
    fetch(`${window.API}/quiz/Create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: title,
            description: description,
            user_ID: user_ID,
            image: image,
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);

    // All the inputs from questions : quiz_ID, question, image, question_num, description, choice, correct_answer, last
    
    setTimeout(() => {
        fetch(`${window.API}/quiz/SearchByTitle/${title}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
    for (let i = 1; i <= localStorage.getItem("createQuestion"); i++) {
    
    let quiz_ID = data.data[0].ID;
    let question = document.querySelector(`.question-title-${i}`).value;
    let image = document.querySelector(`.question-image-${i}`).value;
    let question_num = i;
    let description = document.querySelector(`.question-description-${i}`).value;
    let choice = document.querySelector(`.question-choices-${i}`).value;
    let correct_answer = document.querySelector(`.question-answer-${i}`).value;

    let last = 0;
    if (i == localStorage.getItem("createQuestion")) {
      last = 1;
    }

    console.log("Quiz ID; '"+ quiz_ID+"' Question_Title: '" +question+ "' Image: '"+ image + "' Question number: '"+ question_num + "' Question_Description: '"+ description + "' Question_Choices: '"+ choice + "' Correct_Answer: '"+ correct_answer + "' Last: '"+ last);

    // Fetch questions post
    fetch(`${window.API}/quiz/QuestionCreate`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            quiz_ID : quiz_ID,
            question: question,
            image: image,
            question_num: question_num,
            description: description,
            choice: choice,
            correct_answer: correct_answer,
            last: last,
        })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        })
    }
    }, 100);

})

})

}

function userID() {
    let username = localStorage.getItem("username");
    fetch(`${window.API}/user/SearchByUsername/${username}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Wrong input");
      }
    }).then((data) => {
      localStorage.setItem("user_ID", data.data[0].ID);
    })
}

export { createPage };
