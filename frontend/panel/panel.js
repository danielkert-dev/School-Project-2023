import { mainPage, transition, userID } from "../index.js";

function panelPage(){
    window.scrollTo(0, 0);
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
    <div class="user-quiz-list">
    </div>
    </div>
    <div class="user-control">
    <h3>User Control</h3>
    <input type="text" placeholder="Update your username" class="username-update">
    <input type="text" placeholder="Update your email" class="email-update">
    <input type="password" placeholder="Update your password" class="password-update">
    <button class="user-update">Update User</button>
    <button class="user-delete">Delete User</button>
    </div>
    `

    let username = localStorage.getItem("username");

    // All the quizzes you have created (Update or delete)
    fetch(`${window.API}/quiz/Search/${username}/100/0`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
            return response.json();
    }).then(data => {
        console.log(data.length);

        for (let i = 0; i < data.data.length; i++){
            console.log(data.data[i]);
            let quizList = document.querySelector(".user-quiz-list");
            let quizListItem = document.createElement("div");
            quizListItem.classList.add("user-quiz-item-" + i);
            quizListItem.innerHTML += `
            <p>${data.data[i].title}</p>
            <div class="user-quiz-list-buttons">
            <button class="user-quiz-update-${i}">Update</button>
            <button class="user-quiz-delete-${i}">Delete</button>
            </div>
            `
            quizList.appendChild(quizListItem);

            let quizUpdate = document.querySelector(`.user-quiz-update-${i}`);
            quizUpdate.style.backgroundColor = "var(--blue)";
            let quizDelete = document.querySelector(`.user-quiz-delete-${i}`);
            quizDelete.style.backgroundColor = "var(--red)";

            quizUpdate.addEventListener("click", () => {
                console.log("Update " + data.data[i].quiz_ID);
            })
            quizDelete.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this quiz?")){


                    console.log("Delete " + data.data[i].quiz_ID);


                }
            })


        }

    })

    // Insert your current details

    document.querySelector(".username-update").value = localStorage.getItem("username");
    document.querySelector(".email-update").value = localStorage.getItem("email");
    document.querySelector(".password-update").value = localStorage.getItem("password");

    // Update your account or delete.
}

export { panelPage };