import { mainPage } from "../index.js";

function leaderboardPage() {
    document.querySelector(".search").innerHTML = ``;
    document.querySelector("main").innerHTML = `
        <div class="leaderboard-container">
        <div class="leaderboard-box">
        <h1 class="leaderboard-title">LEADERBOARD</h1>
        <div class="leaderboard-controls">
        <button class="back-button">Back</button>
        </div>
        <table>
        <thead>
        <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Score</th>
        <tbody>
        </tbody>
        </table>
        </div>
        </div>
    `;

    document.querySelector(".back-button").addEventListener("click", () => {
        document.querySelector("header").style.display = "flex";
          document.querySelector("footer").style.display = "flex";
        mainPage();
    })

    fetch(`${window.API}/quiz/LeaderboardSearchAll/10/0`, {
       method : "GET",
       headers : {
           Authorization : `Bearer ${localStorage.getItem("token")}`
       } 
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    }).then((data) => {
        console.log(data);

        for (let i = 0; i < data.data.length; i++) {
            document.querySelector("tbody").innerHTML += `
            <tr>
            <td>${i+1}</td>
            <td>${data.data[i].username}</td>
            <td>${data.data[i].points}</td>
            </tr>
            `;
        }
        
    }).catch((error) => {
        mainPage();
    })


    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
}

export { leaderboardPage };