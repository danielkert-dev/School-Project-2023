function authPage() {
  document.querySelector("main").innerHTML = `
      <div class="login-signup-container">
        <div class="login">
          <h2>Login</h2>
          <input type="text" placeholder="Username" class="login-username">
          <input type="password" placeholder="Password" class="login-password">
          <button class="login-button">Log-in</button>
        </div>
  
        <div class="signup">
          <h2>Signup</h2>
          <input type="text" placeholder="Username" class="signup-username">
          <input type="password" placeholder="Password" class="signup-password">
          <input type="email" placeholder="Email" class="signup-email">
          <button class="signup-button">Sign-up</button>
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
  alert("Welcome " + username);
}

function signup(username, password, email) {
  alert("Welcome " + username);
}

export { authPage };
