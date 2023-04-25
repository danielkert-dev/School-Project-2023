window.API_URL = "http://localhost:8000";

function delete_cookie(name) {
  document.cookie = name + "=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function set_cookie(name, value) {
  document.cookie = name + "=" + value + "; path=/;";
}

function getQuiz() {
  fetch(window.API_URL + `/quiz`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        document.querySelector(
          "main"
        ).innerHTML += `<div class='quiz-box' id='quiz${data.data[i].ID}' onclick='quizLink(${data.data[i].ID})'>
            ${data.data[i].title} <br>
            <img class='quiz-image' src='${data.data[i].image}'>
            <div class='amount'>
            Played : ${data.data[i].amount_done}
            </div>
            </div>`;
      }
    });

  // Just temp boxes
  setTimeout(() => {
    for (let i = 1; i < 10; i++) {
      document.querySelector("main").innerHTML += `<div class='quiz-box-empty'>
            Topic ${i} 
            </div>`;
    }
  }, 100);
  console.log(document.cookie);
}

function setPoints() {
  let points = 0;
  if (localStorage.getItem("points") !== null) {
    points = parseInt(localStorage.getItem("points"));
  }
  document.querySelector(".points").innerHTML = points;
}

function quizLink(quizID) {
  set_cookie("quizID", quizID);
  set_cookie("question", 1);
  console.log(document.cookie);
  window.open("./questions/questions.html", "_self");
}
