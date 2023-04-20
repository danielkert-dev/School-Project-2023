window.addEventListener("DOMContentLoaded", () => {
  test_allUsers();
  test_userByID();
  test_createUser();
  test_updateUser();
});

window.API_URL = "http://localhost:8000";

function test_allUsers() {
  fetch(window.API_URL + `/users`)
    .then((response) => response.json())
    .then((data) => {
      if ((data.success = true)) {
        document.querySelector(
          ".results_users"
        ).innerHTML += `<div class='ok'> Read all users. | Amount : ${data.data.length} | </div>`;
      } else {
        document.querySelector(
          ".results_users"
        ).innerHTML += `<div class='error'> Read all users. | Amount : ${data.data.length} | </div>`;
      }
    })
    .catch((error) => {
      document.querySelector(
        ".results_users"
      ).innerHTML += `<div class='error'> Cannot reach API : ${error} </div>`;
    });
}
function test_userByID() {
  fetch(window.API_URL + `/users/`)
    .then((response) => response.json())
    .then((data) => {
      let id = data.data[data.data.length - 1].ID;
      fetch(window.API_URL + `/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if ((data.success = true)) {
            document.querySelector(
              ".results_users"
            ).innerHTML += `<div class='ok'> Read user id | ID : ${id} </div>`;
          } else {
            document.querySelector(
              ".results_users"
            ).innerHTML += `<div class='error'> Read all users. | Amount : ${id} | </div>`;
          }
        });
    })
    .catch((error) => {
      document.querySelector(
        ".results_users"
      ).innerHTML += `<div class='error'> Cannot reach API : ${error} </div>`;
    });
}
function test_createUser() {
  fetch(window.API_URL + `/users`)
    .then((response) => response.json())
    .then((data) => {
      let id = data.data[data.data.length - 1].ID;
      let deleteSuccess = false;
      let createSuccess = false;

      fetch(window.API_URL + `/users`, {
        method: "POST",
        body: JSON.stringify({
          first_name: "test",
          last_name: "test",
          email: "test",
          password: "test",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          createSuccess = true;
        });

      fetch(window.API_URL + `/users`, {
        method: "DELETE",
        body: JSON.stringify({
          ID: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          deleteSuccess = true;
        });
      setTimeout(() => {
        if (createSuccess && deleteSuccess) {
          document.querySelector(
            ".results_users"
          ).innerHTML += `<div class='ok'> Create user and delete user. | ID : ${id} | </div>`;
        } else {
          document.querySelector(
            ".results_users"
          ).innerHTML += `<div class='error'> Error. | ID : ${id} | </div>`;
        }
      }, 1000);
    })
    .catch((error) => {
      document.querySelector(
        ".results_users"
      ).innerHTML += `<div class='error'> Cannot reach API : ${error} </div>`;
    });
}

function test_updateUser() {
  fetch(window.API_URL + `/users`)
    .then((response) => response.json())
    .then((data) => {
      var first_name = data.data[0].first_name;
      var last_name = data.data[0].last_name;
      var email = data.data[0].email;
      var password = data.data[0].password;
      let id = data.data[0].ID;

      let writeSuccess = false;
      let writeAgainSuccess = false;

      fetch(window.API_URL + `/users`, {
        method: "PATCH",
        body: JSON.stringify({
          first_name: "test2",
          last_name: "test2",
          email: "test2",
          password: "test2",
          ID: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          writeSuccess = true;
        });

      console.log(first_name);
/* // I need to de salt the original password and then put it in as the original 
      setTimeout(() => {
      fetch(window.API_URL + `/users`, {
        method: "PATCH",
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          ID: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          writeAgainSuccess = true;
        });
      },1000)
*/
      setTimeout(() => {
        if (writeSuccess /* && writeAgainSuccess*/) {
          document.querySelector(
            ".results_users"
          ).innerHTML += `<div class='ok'> Update user. | ID : ${id} | </div>`;
        } else {
          document.querySelector(
            ".results_users"
          ).innerHTML += `<div class='error'> Error. | ID : ${id} | </div>`;
        }
      }, 2000);
    });
}
