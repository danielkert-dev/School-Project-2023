import { mainPage } from "../index.js";

function authPage() {

  document.querySelector(".login-signup").style.opacity = "0";

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
function login(username, password) {

  if (username === "" || password === "") {
    return (document.querySelector(".login-response").innerHTML =
      "All fields are required");
  }

  fetch(`${window.API}/user/Auth`, {
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
      let token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      mainPage();
    });
}
function signup(username, password, email) {
  if (username === "" || password === "" || email === "") {
    return (document.querySelector(".signup-response").innerHTML =
      "All fields are required");
  }

  if (username.length < 4) {
    return (document.querySelector(".signup-response").innerHTML =
      "Username must be at least 4 characters long");
  }

  if (password.length < 8) {
    return (document.querySelector(".signup-response").innerHTML =
      "Password must be at least 8 characters long");
  }

  if (!email.includes("@") || !email.includes(".")) {
    return (document.querySelector(".signup-response").innerHTML =
      "Invalid email");
  }

  fetch(`${window.API}/user/Create`, {
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
        document.querySelector(".signup-response").innerHTML =
          "User already exists";
        throw new Error("Wrong username or password"); // Important
      }
    })
    .then((data) => {
      console.log(data);
      alert("User created");
    });
}

export { authPage};
