import { mainPage, transition, userID } from "../index.js";

function panelPage(){
    userID();
    document.querySelector("footer").style.display = "none";
    document.querySelector(".burger-button").style.opacity = "0";
    document.querySelector(".burger-button").style.pointerEvents = "none";
    document.querySelector(".leaderboard").style.opacity = "0";
    document.querySelector(".leaderboard").style.pointerEvents = "none";
    document.querySelector(".create").style.opacity = "0";
    document.querySelector(".create").style.pointerEvents = "none";
    document.querySelector(".panel").style.opacity = "0";
    document.querySelector(".panel").style.pointerEvents = "none";
    document.querySelector(".login-signup").style.opacity = "0";
    document.querySelector(".search").innerHTML = ``;

    document.querySelector("main").innerHTML = `
    <div class="panel-container">

    <div class="panel-control-buttons">
    <button class="back-button">Home</button>
    <button class="panel-tutorial">Tutorial</button>
    </div>

    <div class="panel-items"></div>
    </div>
    `;

        document.querySelector(".back-button").addEventListener("click", () => {
            transition();
            setTimeout(() => {
                document.querySelector("header").style.display = "flex";
                document.querySelector("footer").style.display = "flex";
                mainPage();
            }, 100)
        })

    // If admin or user

    setTimeout(() => {
        if (localStorage.getItem("type") == "admin"){ 
            adminPanel();
        } 
    
        if (localStorage.getItem("type") == "user"){
            userPanel();
        }
    }, 100)
    
}

function adminPanel(){
    alert("Admin Panel");
}

function userPanel(){
    document.querySelector(".panel-items").innerHTML = `
    <div class="user-quiz">
    <h3>Your Quizzes</h3>
    <div clasS="user-quiz-list">
    <p>No quizzes yet</p>
    </div>
    </div>
    <div class="user-control">
    <h3>User Control</h3>
    <input type="text" placeholder="Update your name">
    <input type="text" placeholder="Update your email">
    <input type="text" placeholder="Update your password">
    <button class="user-update">Update</button>
    <button class="user-delete">Delete</button>
    </div>
    `

    // All the quizzes you have created (Update or delete)

    // Update your account or delete.
}

export { panelPage };