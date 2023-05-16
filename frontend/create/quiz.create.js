import { mainPage, transition } from "../index.js";

// quiz/Create

function createPage() {
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
    <button class="create-button">Create Quiz</button>

    <h3>Quiz Title <p class="create-comment">Title of the quiz</p></h3>
    <input class="create-form-quiz-title" type="text" placeholder="Quiz Title...">
    <h3>Quiz Description <p class="create-comment">Description of the quiz</p></h3>
    <textarea class="create-form-quiz-description" type="text" placeholder="Quiz Description..." maxlength="58" width="100%" rows="5"></textarea>
    <h3>Quiz Image <p class="create-comment">Image URL</p></h3>
    <input class="create-form-quiz-image" type="text" placeholder="Quiz Image URL...">

    <button class="add-question-button">Add Question</button>
    </div>
    <div class="create-form-question">
    
    </div>

    </div>
    </div>
  `;

  document.querySelector(".add-question-button").addEventListener("click", () => {
      questionAdd();
  })

  document.querySelector(".create-button").addEventListener("click", () => {
      quizAdd();
  })

  document.querySelector(".back-button").addEventListener("click", () => {
    transition();
    setTimeout(() => {
        document.querySelector("header").style.display = "flex";
        document.querySelector("footer").style.display = "flex";
        mainPage();
    }, 100);
  })

}

function questionAdd () {
    localStorage.setItem("createQuestion", parseInt(localStorage.getItem("createQuestion")) + 1);
    document.querySelector(".create-form-question").innerHTML += `
    <div class="create-question-box" id="create-question-${localStorage.getItem("createQuestion")}">
    <h3>Question ${localStorage.getItem("createQuestion")}</h3>
    </div>
    `
}


function quizAdd() {

    // Fetch user/SearchByUsername/username
    fetch(`${window.API}/user/searchByUsername/${localStorage.getItem("username")}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
        throw new Error(response.statusText);
        }
    })
    .then(data => {
        console.log(data);

    let quizTitle = document.querySelector(".create-form-quiz-title").value;
    let quizDescription = document.querySelector(".create-form-quiz-description").value;
    let userID = data.data[0].ID
    let quizImage = document.querySelector(".create-form-quiz-image").value;

    console.log(quizTitle, quizDescription, userID, quizImage);

    // Fetch quiz/Create body: title,description, user_ID, image
    fetch(`${window.API}/quiz/Create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: quizTitle,
            description: quizDescription,
            user_ID: userID,
            image: quizImage
        })
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
        throw new Error(response.statusText);
        }
    }).then(data => {
        console.log("Created Quiz", data);
        transition();
        setTimeout(() => {
            createPage();
        },100)
    }).catch((error) => {
        document.querySelector("header").style.display = "flex";
        document.querySelector("footer").style.display = "flex";
        mainPage();
    })


}).catch((error) => {
    document.querySelector("header").style.display = "flex";
    document.querySelector("footer").style.display = "flex";
    mainPage();
})
}

export { createPage }