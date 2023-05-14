import { mainPage, transition } from "../index.js";

function resultPage(question, quiz) {
    document.querySelector(".search").innerHTML = ``;
    document.querySelector("main").innerHTML = `
        <div class="result-container">
        <h1> YOUR RESULTS! </h1>
        </div>
    `;
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
}

export { resultPage };