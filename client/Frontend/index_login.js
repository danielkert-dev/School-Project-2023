window.API = "http://localhost:8000";
function login() {
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;

  fetch(`${window.API}/user/auth/${username}/${password}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        document.querySelector(".response").innerHTML = "Login failed";
        document.querySelector(".response").style.color = "red";
      }
    })
    .then((data) => {
      document.querySelector(".response").innerHTML = data.message;
      document.querySelector(".response").style.color = "green";

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        window.open("./quiz/quiz.html", "_self");
      }, 1000);
    });
}
