import { authPage } from "./auth/auth.js";
import { quizPage } from "./quiz/quiz.js";
import { questionPage } from "./question/question.js";
import { leaderboardPage } from "./leaderboard/leaderboard.js";
import { createPage } from "./create/quiz.create.js";

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
      localStorage.setItem("points", data.data[0].points);
    })

    // Set all the values
    document.querySelector(".header-objects").style.display = "flex";
    document.querySelector(".leaderboard").style.opacity = "1";
    document.querySelector(".leaderboard").style.pointerEvents = "auto";
    document.querySelector(".create").style.opacity = "1";
    document.querySelector(".create").style.pointerEvents = "auto";
    document.querySelector(".login-signup").style.opacity = "1";
    document.querySelector(".login-signup").innerHTML = `Log-out`;
    document.querySelector(".login-signup").addEventListener("click", logout);
    document.querySelector("h1").style.pointerEvents = "auto";
  } catch (error) {
    // Catch if not logged in
    document.querySelector(".header-objects").style.display = "none";
    document.querySelector(".leaderboard").style.opacity = "0";
    document.querySelector(".leaderboard").style.pointerEvents = "none";
    document.querySelector(".create").style.opacity = "1";
    document.querySelector(".create").style.pointerEvents = "none";
    document.querySelector(".create").style.opacity = "0";
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
      let quizID = [];
      document.querySelector("main").innerHTML = `
            <div class="quiz-container"></div>
            `;

      for (let i = 0; i < data.data.length; i++) {
        document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box" id="quiz-box-${i}">
            <p>${data.data[i].title}</p>
            <img class="quiz-image" id="quiz-image-${i}" src="${data.data[i].image}">
            <p class="quiz-under-text">Played : ${data.data[i].amount_done}</p>
            <p class="quiz-under-text">By ${data.data[i].username}</p>
            <span>${data.data[i].description}</span>
            </div>
            `;
        quizID.push(data.data[i]);

        document.querySelector(".page-number").value =
          parseInt(localStorage.getItem("page")) + 1;
      }

      setTimeout(() => {
        for (let i = 0; i < quizID.length; i++) {
          document
            .querySelector(`#quiz-box-${i}`)
            .addEventListener("click", () => {
              transition();
              localStorage.setItem("quizID", quizID[i].quiz_ID);
              localStorage.setItem("question", 1);
              localStorage.setItem("score", 0);
              setTimeout(() => {
                questionPage(quizID[i]);
              }, 100);
            });
        }
      }, 200);

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
    <button class="burger-button">☰</button>
    <div class="nav-control">
    <button class="create">&nbsp;+&nbsp;</button>
    <button class="leaderboard">Leaderboard</button>
    <button class="login-signup" id="header-button">Log-in / Sign-up</button>
    </div>

    <div class="nav-control-mobile">
    <button class="create-mobile">&nbsp;+&nbsp;</button>
    <button class="leaderboard-mobile">Leaderboard</button>
    <button class="login-signup-mobile" id="header-button">Log-in / Sign-up</button>
    </div>
    </div>

    </div>
    `;

    document.querySelector(".leaderboard").addEventListener("click", () => {
      transition();
      setTimeout(() => {
        leaderboardPage();  
      }, 100)
      });
  
    document.querySelector(".create").addEventListener("click", () => {
      transition();
      setTimeout(() => {
        createPage();
      }, 100)
    })
  
    document.querySelector(".login-signup").addEventListener("click", authPage);
  
  

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      document.querySelector(".nav-control-mobile").style.display = "none";
      document.querySelector("main").style.filter = "brightness(100%)";
    }
  })


  document.querySelector(".burger-button").addEventListener("click", () => {
    if (document.querySelector(".nav-control-mobile").style.display === "block") {
      document.querySelector(".nav-control-mobile").style.display = "none";
      document.querySelector("main").style.filter = "brightness(100%)";
    } else {
      document.querySelector(".nav-control-mobile").style.display = "block";
      document.querySelector("main").style.filter = "brightness(40%)";
    }
  })

  
  document.querySelector(".leaderboard-mobile").addEventListener("click", () => {
    document.querySelector(".nav-control-mobile").style.display = "none";
    document.querySelector("main").style.filter = "brightness(100%)";
    transition();
    setTimeout(() => {
      leaderboardPage();  
    }, 100)
    });

  document.querySelector(".create-mobile").addEventListener("click", () => {
    document.querySelector(".nav-control-mobile").style.display = "none";
    document.querySelector("main").style.filter = "brightness(100%)";
    transition();
    setTimeout(() => {
      createPage();
    }, 100)
  })

  document.querySelector(".login-signup-mobile").addEventListener("click", () => {
    document.querySelector(".nav-control-mobile").style.display = "none";
    document.querySelector(".header-objects").style.display = "none";
    document.querySelector("main").style.filter = "brightness(100%)";
    authPage();
  });



  
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
