window.API_URL = "http://localhost:8000";

function cookieQuestion() {
    console.log(document.cookie);
    let quizID = document.cookie
    .split(";")
    .find((row) => row.startsWith("quizID="))
    ?.split("=")[1];

    let question = document.cookie
    .split(";")
    .find((row) => row.startsWith(" question="))
    ?.split("=")[1];

    return `${quizID}/${question}`;
}

function getQuestion() {
  let question = cookieQuestion();
  fetch(window.API_URL + `/questions/${question}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("main").innerHTML += `<div class='question-box'>
            <h1>${data.data.description}</h1> <br>
            <img class='question-image' src='${data.data.image}'> <br>
            <div class='buttons'>
            <button id='choice1' onclick='correctAnswer()'>${
              data.data.choice1
            }</button>
            <button id='choice2' onclick='correctAnswer()'>${
              data.data.choice2
            }</button>
            <button id='choice3' onclick='correctAnswer()'>${
              data.data.choice3
            }</button>
            <button id='choice4' onclick='correctAnswer()'>${
              data.data.choice4
            }</button>
            </div></div>`;
    });
}

function correctAnswer() {
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
          nextQuestion();
          break;
        case 2:
          choice1.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice2.style.backgroundColor = "rgba(0,255,0,0.2)";
          choice3.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice4.style.backgroundColor = "rgba(255,0,0,0.2)";
          nextQuestion();
          break;
        case 3:
          choice1.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice2.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice3.style.backgroundColor = "rgba(0,255,0,0.2)";
          choice4.style.backgroundColor = "rgba(255,0,0,0.2)";
          nextQuestion();
          break;
        case 4:
          choice1.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice2.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice3.style.backgroundColor = "rgba(255,0,0,0.2)";
          choice4.style.backgroundColor = "rgba(0,255,0,0.2)";
          nextQuestion();
          break;
        default:
          console.log("FAIL");
          break;
      }
    });
}

function nextQuestion() {
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

  let question = document.cookie
    .split(";")
    .find((row) => row.startsWith(" question="))
    ?.split("=")[1];

    document.cookie = "question=" + (parseInt(question) + 1) + ";path=/";
}
