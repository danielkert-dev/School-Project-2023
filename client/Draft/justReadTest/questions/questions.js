window.API_URL = "http://localhost:8000";

function cookieQuestion() {
  let quizID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("quizID="))
    ?.split("=")[1];

  let question = document.cookie
    .split("; ")
    .find((row) => row.startsWith("question="))
    ?.split("=")[1];

  return `${quizID}/${question}`;
}

function getQuestion() {
  console.log(document.cookie);
  let question = cookieQuestion();
  let quizID = question.split("/")[0];

  fetch(window.API_URL + `/questions/${question}`)
    .then((response) =>  {
        if (response.ok) {
          return response.json()
        } else if(response.status === 404) {
            window.open("../index.html", "_self");
        } else {
            window.open("../index.html", "_self");
        }})
    .then((data) => {
      if (data.data.description === "exit") {
        window.open("../index.html", "_self");
      }

      fetch(window.API_URL + `/questions/amount/amount/${quizID}`)
      .then((response) => response.json())
      .then((amount) => {

      document.querySelector("main").innerHTML += `<div class='question-box'>
            <br>
            <p>Question : ${data.data.question} / ${amount.data.c - 1}</p>
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
  let question = cookieQuestion();
  fetch(window.API_URL + `/questions/${question}`)
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

  let question = document.cookie
    .split("; ")
    .find((row) => row.startsWith("question="))
    ?.split("=")[1];

  document.cookie = "question=" + (parseInt(question) + 1) + ";path=/";

  localStorage.setItem("points", Number(localStorage.getItem("points")) + 1);

  setTimeout(() => {
    window.location.reload();
  }, 2000);
}
