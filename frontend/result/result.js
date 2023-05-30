import { mainPage, transition } from "../index.js";

async function resultPage() { // Result page after questions
    window.scrollTo(0, 0);
    // Fill the page
    document.querySelector(".search").innerHTML = ``;
    document.querySelector("main").innerHTML = `
        <div class="result-container">
        <div class="result-box">
        <h1 class="result-title"> YOUR RESULTS! </h1>
        <h3 class="result-points">Your points: ${localStorage.getItem("points")} + ${localStorage.getItem("score")}</h3>
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
   
    await fetch(`${window.API}/quiz/QuestionSearchResult/${localStorage.getItem("quizID")}/${i+1}`, { // Get the question in API
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

            // List the choices that were correct
            let correctAnswers = localStorage.getItem("correct").split(";");
            correctAnswers = correctAnswers.map(Number);

            let choices = data.data[0].choice.split(";");
            
            let answer = data.data[0].correct_answer.split(";");
            let correct = choices[answer-1];

            if (correct === undefined) {
                correct = "Multiple Correct Choices";
            }

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

            document.querySelector(".result-answer").innerHTML += `
            <br>
            <br>
            `

        
        })
    }

    quizAddAmountDone();
    localStorage.setItem("correct", "");
}

function quizAddAmountDone() { // Add the amount played

    let quizID = parseInt(localStorage.getItem("quizID"));
    console.log(quizID);

    fetch(`${window.API}/quiz/AmountAdd`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            id: quizID,
          }),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        mainPage();
    })
}

export { resultPage };