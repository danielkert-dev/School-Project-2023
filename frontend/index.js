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
    document.querySelector(".login-signup").style.opacity = "1";
    return (document.querySelector(
      "main"
    ).innerHTML = `<br><br><br><br><br><h1 class="auth-warning">Log-in or sign-up to continue</h1><h1>`);
  }

  document.querySelector("main").innerHTML = `
    <div class="main-page">
    <input type="text" placeholder="🔍 Search for a quiz..." class="search-box">
    </div>
    <hr>
    <div class="quiz-controller">
    <div class="quiz-controller-2">
    <button class="page-button" id="quiz-button-1"><</button>
    <input type="number" min="1" max="20" class="page-number">
    <button class="page-button" id="quiz-button-2">></button>
    <div>
    </div>
    `;

  if (localStorage.getItem("page") === null) {
    localStorage.setItem("page", 0);
  }

  setTimeout(() => {
    document.querySelector("#quiz-button-1").addEventListener("click", () => {
      console.log(localStorage.getItem("page"));
      if (parseInt(localStorage.getItem("page")) === 0) {
        return;
      }
      localStorage.setItem("page", parseInt(localStorage.getItem("page")) - 1);
      location.reload();
    });
    document.querySelector("#quiz-button-2").addEventListener("click", () => {
      console.log(localStorage.getItem("page"));
      localStorage.setItem("page", parseInt(localStorage.getItem("page")) + 1);
      location.reload();
    });
    document.querySelector(".page-number").addEventListener("change", () => {
      if (parseInt(document.querySelector(".page-number").value) < 1) {
        return;
      }
      localStorage.setItem("page", document.querySelector(".page-number").value -1);
      location.reload();
    })
  }, 200);

  quizPage(20, parseInt(localStorage.getItem("page")));
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
    © ${new Date().getFullYear()} - Daniel Kertsmik - &nbsp;<div class="footer-links">
    <a href="#">Privacy Policy</a>
    </div>
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
