
window.API_URL = "http://localhost:8000";

function getQuiz() {
    fetch(window.API_URL + `/quiz`)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.data.length; i++) {
            document.querySelector("main").innerHTML +=
            `<div class='quiz-box' id='quiz${data.data[i].ID}' onclick='quizLink(${data.data[i].ID})'>
            ${data.data[i].title} <br>
            <img class='quiz-image' src='${data.data[i].image}'>
            <div class='amount'>
            Played : ${data.data[i].amount_done}
            </div>
            </div>`;
            }
        })

    // Just temp boxes
    setTimeout(() => {
        for(let i= 1; i < 10; i++) {
            document.querySelector("main").innerHTML += 
            `<div class='quiz-box-empty'>
            Topic ${i} 
            </div>`;
        }        
    },100)

}

function quizLink(quizID) {
    document.cookie = "quizID=" + quizID;
    window.open("./questions/questions.html", "_self");
}