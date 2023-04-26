window.API = "http://localhost:8000";

function leaderBoard() {
  if (!localStorage.getItem("token")) {
    window.open("../index.html", "_self");
  }

  localStorage.setItem("from", 0);
  localStorage.setItem("to", 10);

  let from = localStorage.getItem("from");
  let to = localStorage.getItem("to");

  fetch(window.API + `/leaderboard/${from}/${to}`, {})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success === false) {
        window.open("../index.html", "_self");
      }
      for (let i = 0; i < data.data.length; i++) {
        console.log(data.data);
        document.querySelector("tbody").innerHTML += `
            <tr>
            <td>
            ${data.data[i].username}
            </td>
            <td>
            ${data.data[i].points}
            </td>
            </tr>
            `;
      }
      for (let i = data.data.length; i < localStorage.getItem("to"); i++) {
        document.querySelector("tbody").innerHTML += `
        <tr>
        <td>
        -
        </td>
        <td>
        -
        </td>
        </tr>
        `;

    }
    });

  document.querySelector(".top").innerHTML = `Top : ${to}`;
}

function index() {
  window.open("../quiz/quiz.html", "_self");
}