import { mainPage, transition, userID } from "../index.js";
import { panelPageUpdate } from "./update.panel.js";
import { authPage } from "../auth/auth.js";

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
    document.querySelector(".panel-items").innerHTML = `
    <div class="admin-container">
    <div class="all-users"></div>
    <div class="all-quizzes"></div>
    </div>
    `

    // List all users


    // List all quizzes
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
    fetch(`${window.API}/quiz/Search/${username}/100/0`, { // If anybody make more then 100 quizzes then its worth changing
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
            return response.json();
    }).then(data => {

        for (let i = 0; i < data.data.length; i++){
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
                transition();
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    panelPageUpdate(data.data[i]);
                }, 100)
            })

            quizDelete.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this quiz?")){


                    console.log("Delete " + data.data[i].quiz_ID);

                    fetch(`${window.API}/quiz/Delete`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                            id : data.data[i].quiz_ID,
                        })
                        
                    }).then((res) => res.json())
                    .then((data) => {
                        console.log("Deleted: " + data);
                    })
                    

                    transition();
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                        panelPage();
                    }, 100);

                }
            })


        }

    })

    // Insert your current details

    document.querySelector(".username-update").value = localStorage.getItem("username");
    document.querySelector(".email-update").value = localStorage.getItem("email");
    document.querySelector(".password-update").value = localStorage.getItem("password");

    // Update your account.

    let userUpdate = document.querySelector(".user-update");
    let userDelete = document.querySelector(".user-delete");

    userUpdate.addEventListener("click", () => {
        if (confirm("Are you sure you want to update your account?")){
            let username = document.querySelector(".username-update").value;
            let email = document.querySelector(".email-update").value;
            let password = document.querySelector(".password-update").value;
            let userID = parseInt(localStorage.getItem("user_ID"));

            console.log(typeof username + " " + email + " " + password + " " + typeof userID);

            // Fetch update

                fetch(`${window.API}/user/Update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        id: userID,
                    })
                }).then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log("Updated");
                    console.log(data);
                })

                transition();
                setTimeout(() => {
                    localStorage.clear();
                    location.reload();
                    window.scrollTo(0, 0);
                }, 100)
        }
        
    })

    userDelete.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete your account?")){

            // Fetch delete (Update to anonymous account)
            fetch (`${window.API}/user/Delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    id: parseInt(localStorage.getItem("user_ID")),
                })
            })

            transition();
            setTimeout(() => {
                localStorage.clear();
                location.reload();
                window.scrollTo(0, 0);
            }, 100);
        }

    })


    // Delete your account.
}

export { panelPage };