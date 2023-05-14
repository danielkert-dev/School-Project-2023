import { authPage } from "./auth/auth.js";
import { quizPage } from "./quiz/quiz.js";
import { questionPage } from "./question/question.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the page
  header();
  footer();

  mainPage();

  titleClick();
});

export function mainPage() {
  // Main page
  try {
    const token = localStorage.getItem("token"); // Checks if token is in local storage
    if (!token) {
      throw new Error("Token not found");
    }
    const decode = JSON.parse(atob(token.split(".")[1])); // Checks if token is not out of date
    console.log(decode);
    if (decode.exp * 1000 < new Date().getTime()) {
      throw new Error("Token expired");
    }

    if (!localStorage.getItem("username") || !localStorage.getItem("token")) {
      // Check if there is a user and a token
      throw new Error("LocalStorage items not found");
    }

    let username = localStorage.getItem("username");
    fetch(`${window.API}/user/SearchByUsername/${username}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Wrong input");
      }
    }).then((data) => {
      document.querySelector(".user-info").innerHTML = `<p>${username}</p> <p id="points">Points: ${data.data[0].points}<p>`;
    })

    // Set all the values
    document.querySelector(".login-signup").style.opacity = "1";
    document.querySelector(".login-signup").innerHTML = `Log-out`;
    document.querySelector(".login-signup").addEventListener("click", logout);
  } catch (error) {
    // Catch if not logged in
    document.querySelector(".login-signup").style.opacity = "1";
    return (document.querySelector(
      "main"
    ).innerHTML = `<br><br><br><br><br><h1 class="auth-warning">Log-in or sign-up to continue</h1><h1>`);
  }

  // Set the search bar
  document.querySelector(".search").innerHTML = `
  <div class="main-page">
  <input type="text" placeholder="🔍 Search for a quiz..." class="search-box">
  </div>
  <div class="quiz-controller">
    <div class="quiz-controller-2">
    <button class="page-button" id="quiz-button-1"><</button>
    <input type="number" min="1" max="20" class="page-number">
    <button class="page-button" id="quiz-button-2">></button>
    <div>
    </div>
  `;

  document.querySelector(".search-box").value = localStorage.getItem("search");

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
      localStorage.setItem(
        "page",
        document.querySelector(".page-number").value - 1
      );
      location.reload();
    });

    document.querySelector(".search-box").addEventListener("keyup", (e) => {
      // console.log(e.target.value);
      transition();
      setTimeout(() => {
        localStorage.setItem("page", 0);
        localStorage.setItem("list", "search");
        localStorage.setItem("search", e.target.value);
        search(e.target.value, 20, parseInt(localStorage.getItem("page")));
      }, 100);
    });
  }, 200);

  if (localStorage.getItem("list") === "all") {
    transition();
    setTimeout(() => {
      quizPage(20, parseInt(localStorage.getItem("page")));
    }, 200);
  } else {
    search(
      localStorage.getItem("search"),
      20,
      parseInt(localStorage.getItem("page"))
    );
  }
}

function search(input, page, pageSize) {
  if (input === "") {
    localStorage.setItem("list", "all");
    quizPage(20, parseInt(localStorage.getItem("page")));
  }

  console.log(input);

  fetch(`${window.API}/quiz/Search/${input}/${page}/${pageSize}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log(data);

      document.querySelector("main").innerHTML = `
            <div class="quiz-container"></div>
            `;
      for (let i = 0; i < data.data.length; i++) {
        document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box" id="quiz-box-${i}">
            <p class="quiz-box-title">${data.data[i].title}</p>
            <img class="quiz-image" src="${data.data[i].image}">
            <p class="quiz-under-text">${data.data[i].description}</p>
            <p class="quiz-under-text">${data.data[i].username}</p>
            </div>
            `;
      }

      document.querySelector(".page-number").value =
        parseInt(localStorage.getItem("page")) + 1;

      setTimeout(() => {
        for (let i = 0; i < 20 - data.data.length; i++) {
          document.querySelector(".quiz-container").innerHTML += `
                  <div class="quiz-box-empty">
                  Quiz
                  </div>
                  `;
        }
      }, 100);
    })
    .catch((error) => {
      document.querySelector("main").innerHTML += `
            <div class="quiz-container"></div>
            `;
      for (let i = 0; i < 20; i++) {
        document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box-empty">
            Quiz
            </div>
            `;
        document.querySelector(".page-number").value =
          parseInt(localStorage.getItem("page")) + 1;
      }
    });
}

export function header() {
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

export function titleClick() {
  document.querySelector(".title").addEventListener("click", () => {
    transition();
    setTimeout(() => {
      mainPage();
    }, 100);
  });
}

function logout() {
  setTimeout(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    document.querySelector(".user-info").innerHTML = "";
  }, 100);
}

export function transition() {
  document.querySelector("main").style.opacity = "0";
  document.querySelector("body").style.pointerEvents = "none";
  setTimeout(() => {
    document.querySelector("main").style.opacity = "1";
    document.querySelector("body").style.pointerEvents = "auto";
  }, 400);
}
