import { mainPage } from "../index.js";

function authPage() {
  window.scrollTo(0, 0); // Scroll to top of page
  localStorage.setItem("authPage", "auth"); // Set authPage to auth

  document.querySelector(".search").innerHTML = ""; // Clear search

  // Set styling
  document.querySelector(".burger-button").style.opacity = "0";
  document.querySelector(".burger-button").style.pointerEvents = "none";
  document.querySelector(".leaderboard").style.opacity = "0";
    document.querySelector(".leaderboard").style.pointerEvents = "none";
    document.querySelector(".create").style.opacity = "0";
    document.querySelector(".create").style.pointerEvents = "none";
    document.querySelector(".panel").style.opacity = "0";
    document.querySelector(".panel").style.pointerEvents = "none";
    document.querySelector(".login-signup").style.opacity = "0";
  document.querySelector("h1").style.pointerEvents = "none";


  // Fill the auth page
  document.querySelector("main").innerHTML = `
      <div class="login-signup-container">
        <div class="login">
          <h2>Log-in</h2>
          <input type="text" placeholder="Username" class="login-username">
          <input type="password" placeholder="Password" class="login-password">
          <button class="login-button">Log-in</button>
          <div class="login-response"></div>
        </div>
  
        <div class="signup">
          <h2>Sign-up</h2>
          <input type="text" placeholder="Username" class="signup-username">
          <input type="password" placeholder="Password" class="signup-password">
          <input type="email" placeholder="Email" class="signup-email">
          <button class="signup-button">Sign-up</button>
          <div class="signup-response"></div>
        </div>
      </div>
    `;

    // Add event listeners for log-in and sign-up
  document.querySelector(".login-button").addEventListener("click", () => {
    const loginUsername = document.querySelector(".login-username").value;
    const loginPassword = document.querySelector(".login-password").value;
    login(loginUsername, loginPassword);
  });

  document.querySelector(".signup-button").addEventListener("click", () => {
    const signupUsername = document.querySelector(".signup-username").value;
    const signupPassword = document.querySelector(".signup-password").value;
    const signupEmail = document.querySelector(".signup-email").value;
    signup(signupUsername, signupPassword, signupEmail);
  });
}
function login(username, password) { // Login function
  if (username === "" || password === "") { // If username or password is empty
    return (document.querySelector(".login-response").innerHTML =
      "All fields are required");
  }

  fetch(`${window.API}/user/Auth`, { // Authenticate user with username and password in API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        document.querySelector(".login-response").innerHTML =
          "Wrong username or password";
        throw new Error("Wrong username or password"); // Important
      }
    })
    .then((data) => {
      console.log(data);
      let token = data.token; // Get token from response
      localStorage.setItem("token", token); // Store token
      localStorage.setItem("username", username); // Store username
      localStorage.setItem("password", password); // Store password
      localStorage.setItem("list", "all"); // Default values
      localStorage.setItem("correct", "");
      localStorage.setItem("correctAnswer", "");

      mainPage(); // To main page
    });
}
function signup(username, password, email) { // Signup function
  if (username === "" || password === "" || email === "") {
    return (document.querySelector(".signup-response").innerHTML =
      "All fields are required");
  }

  if (username.length < 4) { // If username is less than 4
    return (document.querySelector(".signup-response").innerHTML =
      "Username must be at least 4 characters long");
  }

  if (password.length < 8) { // If password is less than 8
    return (document.querySelector(".signup-response").innerHTML =
      "Password must be at least 8 characters long");
  }

  if (!email.includes("@") || !email.includes(".")) { // If email is invalid
    return (document.querySelector(".signup-response").innerHTML =
      "Invalid email");
  }

  fetch(`${window.API}/user/Create`, { // Create user with username and password and email in API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        document.querySelector(".signup-response").innerHTML = // If user already exists
          "User already exists";
        throw new Error("Wrong username or password"); // Important
      }
    })
    .then((data) => {
      console.log(data);
      fetch(`${window.API}/user/Auth`, { // Authenticate user with username and password in API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            document.querySelector(".login-response").innerHTML = // If user already exists
              "Wrong username or password";
            throw new Error("Wrong username or password"); // Important
          }
        }) 
        .then((data) => {
          console.log(data);
          let token = data.token; // Get token from response
          localStorage.setItem("token", token); // Store token
          localStorage.setItem("username", username); // Store username
          localStorage.setItem("password", password); // Store password
          localStorage.setItem("list", "all"); // Default values

          mainPage(); // To main page
        });
    });
}

export { authPage };
