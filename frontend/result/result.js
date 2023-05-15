import { mainPage, transition } from "../index.js";

async function resultPage() {
    document.querySelector(".search").innerHTML = ``;
    document.querySelector("main").innerHTML = `
        <div class="result-container">
        <div class="result-box">
        <h1 class="result-title"> YOUR RESULTS! </h1>
        <div class="result-controls">
        <button class="back-button">Back</button>
        </div>
        <p>Your score: ${localStorage.getItem("score")}/${localStorage.getItem("question")-1}</p>
        <div class="result-answer">
        </div>
        </div>
        </div>
    `;
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";

    document.querySelector(".back-button").addEventListener("click", () => {
        document.querySelector("header").style.display = "flex";
        document.querySelector("footer").style.display = "flex";
        mainPage();
      });

    for (let i = 0; i < localStorage.getItem("question")-1; i++) {
   
    await fetch(`${window.API}/quiz/QuestionSearch/${localStorage.getItem("quizID")}/${i+1}`, {
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

            let correctAnswers = localStorage.getItem("correct").split(";");
            correctAnswers = correctAnswers.map(Number);

            let choices = data.data[0].choice.split(";");
            let answer = data.data[0].correct_answer;
            let correct = choices[answer-1];

            console.log(data.data[0].question_num);

            if (correctAnswers.includes(data.data[0].question_num)) {


                document.querySelector(".result-answer").innerHTML += `
                <div id="result-answer-box-${i+1}" class="correct-answer">
                <p>Question : ${i+1}</p>
                <p>${data.data[0].question}</p>
                <p>Correct Answer : ${correct}</p>
                </div>
                `

            } else {
                document.querySelector(".result-answer").innerHTML += `
                <div id="result-answer-box-${i+1}" class="wrong-answer">
                <p>Question : ${i+1}</p>
                <p>${data.data[0].question}</p>
                <p>Correct Answer : ${correct}</p>
                </div>
                `
            }

        
        })
    }

    localStorage.setItem("correct", "");
}

export { resultPage };