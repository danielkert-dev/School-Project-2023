window.addEventListener("DOMContentLoaded", () => {
  test_allUsers();
  test_userByID();
});

window.API_URL = "http://localhost:8000";

function test_allUsers() {
  fetch(window.API_URL + `/users`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.success);
      if ((data.success = true)) {
        document.querySelector(
          ".results_users"
        ).innerHTML += `<div class='ok'> Read all users. | Amount : ${data.data.length} | </div>`;
      }
    });
}

function test_userByID() {
  fetch(window.API_URL + `/users/1`)
    .then((response) => response.json())
    .then((data) => {
      if ((data.success = true)) {
        document.querySelector(
          ".results_users"
        ).innerHTML += `<div class='ok'> Read user 1. | ID : ${data.data.ID} | Last Login : ${data.data.last_login}</div>`;
      }
    });
}
