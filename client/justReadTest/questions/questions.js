window.API_URL = "http://localhost:8000";

function cookieQID() {
    return document.cookie
        .split(";")
        .find((row) => row.startsWith("quizID="))
        ?.split("=")[1];
}

function getQuestion() {
    console.log(cookieQID());
    let quizID = cookieQID();
    fetch(window.API_URL + `/questions/quiz/${quizID}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.querySelector("main").innerHTML += `<h1>
            ${data.data.ID}
            ${data.data.description}</h1>`;
        })
}