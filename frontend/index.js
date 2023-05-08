import { authPage } from "./auth/auth.js";
import { quizPage } from "./quiz/quiz.js";

document.addEventListener("DOMContentLoaded", () => {
  header();
  footer();

  mainPage();

  titleClick();
});

export function mainPage() {

  try {
    if (!localStorage.getItem("username") || !localStorage.getItem("token")) {
      throw new Error("LocalStorage items not found");
    }

    let username = localStorage.getItem("username");
    document.querySelector(".user-info").innerHTML = `${username}`;
    document.querySelector(".login-signup").style.opacity = "1";
    document.querySelector(".login-signup").innerHTML = `Log-out`;
    document.querySelector(".login-signup").addEventListener("click", logout);
  } catch (error) {
    console.log("doublecrap", error);
    document.querySelector(".login-signup").style.opacity = "1";
  }

  document.querySelector("main").innerHTML = `
    <div class="main-page">
    <input type="text" placeholder="Search for a quiz..." class="search-box">
    <button class="search-button">Search</button>
    </div>
    <hr>
    `;

  quizPage();
}

function header() {
  document.querySelector("header").innerHTML = `
    <h1 class="title">GUESS RIGHT</h1>

    <div class="header-objects">

    <div class="user-info"></div>

    <button class="login-signup" id="header-button">Log-in / Sign-up</button>
    </div>

    </div>
    `;

  document.querySelector(".login-signup").addEventListener("click", authPage);
}

function footer() {
  document.querySelector("footer").innerHTML = `
    © ${new Date().getFullYear()} - Daniel Kertsmik
    `;
}

function titleClick() {
  document.querySelector(".title").addEventListener("click", () => {
    mainPage();
  });
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  document.querySelector(".user-info").innerHTML = "";
}
