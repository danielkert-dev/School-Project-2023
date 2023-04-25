window.API = "http://localhost:8000";

function getQuiz() {

    if (!localStorage.getItem("token")) {
        window.open("../index.html", "_self");
    }

  const myHeaders = new Headers();
  console.log(localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  fetch(window.API + `/quiz`, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        window.open("../index.html", "_self");
      }
    })
    .then((data) => {
      console.log(data);
      if (data.success === false) {
        window.open("../index.html", "_self");
      }

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
}

function quizLink(quizID) {
  localStorage.setItem("quizID", quizID);
  localStorage.setItem("question", 1);
  window.open("./question.html", "_self");
}
