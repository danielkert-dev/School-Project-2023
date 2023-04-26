window.API = "http://localhost:8000";

function getQuestion() {
  if (!localStorage.getItem("token")) {
    window.open("../index.html", "_self");
  }

  let question = localStorage.getItem("question");
  let quizID = localStorage.getItem("quizID");

  const myHeaders = new Headers();
  console.log(localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  fetch(window.API + `/question/${quizID}/${question}`, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        window.open("../quiz.html", "_self");
      } else {
        window.open("../quiz.html", "_self");
      }
    })
    .then((data) => {

      fetch(window.API + `/question/amount/amount/${quizID}`).then((response) => {return response.json();})
      .then((amount) => {
        


      localStorage.setItem("questionID", data.data.ID);

      if (data.data.last === 1) {
        window.open("./quiz.html", "_self");

        fetch(window.API + `/question/played/${localStorage.getItem("quizID")}`, {
          method: "PATCH",
        })
          .then((response) => {
            return response.json();
          })
          .then((played) => {
            console.log(played);
          })
      }
      console.log(data);
      document.querySelector("main").innerHTML += `<div class='question-box'>
            <br>
            <p>Question : ${data.data.question} / ${amount.data.c -1} </p>
            <h1>${data.data.description}</h1> <br>
            <img class='question-image' src='${data.data.image}'> <br>
            <div class='buttons'>
            <button id='choice1' onclick='correctAnswer(1)'>${data.data.choice1}</button>
            <button id='choice2' onclick='correctAnswer(2)'>${data.data.choice2}</button>
            <button id='choice3' onclick='correctAnswer(3)'>${data.data.choice3}</button>
            <button id='choice4' onclick='correctAnswer(4)'>${data.data.choice4}</button>
            </div></div>`;
          });
    });
}

function correctAnswer(selectedAnswer) {
  if (!localStorage.getItem("token")) {
    window.open("../index.html", "_self");
  }

  document.querySelector("main").style.pointerEvents = "none";

  let question = localStorage.getItem("question");
  let quizID = localStorage.getItem("quizID");

  const myHeaders = new Headers();
  console.log(localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  fetch(window.API + `/question/${quizID}/${question}/`, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((data) => {
      let correct_answer = data.data.correct_answer;

      let choice1 = document.querySelector("#choice1");
      let choice2 = document.querySelector("#choice2");
      let choice3 = document.querySelector("#choice3");
      let choice4 = document.querySelector("#choice4");

      switch (correct_answer) {
        case 1:
          choice1.style.backgroundColor = "rgba(0,255,0,0.2)";
          choice2.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice3.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice4.style.backgroundColor = "rgba(255,0,0,0.2)";
          nextQuestion(selectedAnswer, correct_answer);
          break;
        case 2:
          choice1.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice2.style.backgroundColor = "rgba(0,255,0,0.2)";
          choice3.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice4.style.backgroundColor = "rgba(255,0,0,0.2)";
          nextQuestion(selectedAnswer, correct_answer);
          break;
        case 3:
          choice1.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice2.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice3.style.backgroundColor = "rgba(0,255,0,0.2)";
          choice4.style.backgroundColor = "rgba(255,0,0,0.2)";
          nextQuestion(selectedAnswer, correct_answer);
          break;
        case 4:
          choice1.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice2.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice3.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice4.style.backgroundColor = "rgba(0,255,0,0.2)";
          nextQuestion(selectedAnswer, correct_answer);
          break;
        default:
          console.log("Something went wrong!");
          break;
      }
    });
}

function nextQuestion(user_choice, correct_answer) {
  if (!localStorage.getItem("token")) {
    window.open("../index.html", "_self");
  }

  let choice1 = document.querySelector("#choice1");
  let choice2 = document.querySelector("#choice2");
  let choice3 = document.querySelector("#choice3");
  let choice4 = document.querySelector("#choice4");

  choice1.disable = true;
  choice2.disable = true;
  choice3.disable = true;
  choice4.disable = true;

  choice1.style.cursor = "default";
  choice2.style.cursor = "default";
  choice3.style.cursor = "default";
  choice4.style.cursor = "default";

  console.log(user_choice);
  console.log(correct_answer);

  if (user_choice === correct_answer) {
    document.querySelector("main").innerHTML += "<h1>Correct!</h1>";
  } else {
    document.querySelector("main").innerHTML += "<h1>Wrong!</h1>";
  }

  let questionID = localStorage.getItem("questionID");
  let username = localStorage.getItem("username");

  console.log(window.API + `/user/points/${username}/${questionID}`);

  fetch(window.API + `/user/points/${username}/${questionID}/`, {
    method: "PATCH",
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })


  let question = localStorage.getItem("question");

  localStorage.setItem("question", parseInt(question) + 1);

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
