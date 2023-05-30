import { mainPage } from "../index.js";

function leaderboardPage() {
    window.scrollTo(0, 0); // Scroll to top
    document.querySelector(".search").innerHTML = ``; // Clear search field
    // Fill page with leaderboard data
    document.querySelector("main").innerHTML = ` 
        <div class="leaderboard-container">
        <div class="leaderboard-box">
        <h1 class="leaderboard-title">LEADERBOARD</h1>
        <h3 class="leaderboard-points">Your points: ${localStorage.getItem("points")}</h3>
        <div class="leaderboard-controls">
        <button class="back-button">Back</button>
        </div>
        <div class="leaderboard-table">
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
        <br>
        <br>
        </div>
        </div>
    `;

    document.querySelector(".back-button").addEventListener("click", () => { // Back button
        document.querySelector("header").style.display = "flex";
          document.querySelector("footer").style.display = "flex";
        mainPage();
    })

    fetch(`${window.API}/quiz/LeaderboardSearchAll/10/0`, { // Search top 10 users by points
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

        for (let i = 0; i < data.data.length; i++) { // Fill leaderboard table
            document.querySelector("tbody").innerHTML += `
            <tr>
            <td>${i+1}</td>
            <td>${data.data[i].username}</td>
            <td>${data.data[i].points}</td>
            </tr>
            `;
        }
        
    }).catch((error) => {
        mainPage(); // Redirect to main page
    })


    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
}

export { leaderboardPage };