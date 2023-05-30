import { mainPage, transition, userID } from "../index.js";
import { panelPageUpdate } from "./update.panel.js";
import { authPage } from "../auth/auth.js"; 

function panelPage(){
    window.scrollTo(0, 0); // Scroll to top
    userID(); // Get user ID and other data
    document.querySelector("footer").style.display = "none"; // Style changes
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

    // Fill the page
    document.querySelector("main").innerHTML = `
    <div class="panel-container">

    <div class="panel-control-buttons">
    <button class="back-button">Home</button>
    </div>

    <div class="panel-items"></div>
    </div>
    `;


        document.querySelector(".back-button").addEventListener("click", () => { // Back button
            transition();
            setTimeout(() => {
                document.querySelector("header").style.display = "flex";
                document.querySelector("footer").style.display = "flex";
                mainPage();
            }, 100)
        })

    // If admin or user

    setTimeout(() => {
        if (localStorage.getItem("type") == "admin"){ // If admin set to admin panel
            adminPanel();
        } 
    
        if (localStorage.getItem("type") == "user"){ // If user set to user panel
            userPanel();
        }
    }, 100)
    
}

function adminPanel(){ // Admin panel
    // Fill the page
    document.querySelector(".panel-items").innerHTML = `
    <div class="admin-container">
    <div class="all-users">
    <h3>All Users</h3>
    <input type="text" placeholder="Page..." class="admin-page" value="1">
    <input type="text" placeholder="Search..." class="admin-search">
    <div class="admin-users-list">
    </div>
    </div>
    <div class="all-quizzes">
    <h3>All Quizzes</h3>
    <input type="text" placeholder="Page..." class="admin-quiz-page" value="1">
    <input type="text" placeholder="Search..." class="admin-quiz-search">
    <div class="admin-quiz-list">
    </div>
    </div>
    </div>
    `

    // List all users and delete

    adminUserSearchAll(document.querySelector(".admin-page").value-1);

    document.querySelector(".admin-page").addEventListener("keyup", (e) => {
        adminUserSearchAll(document.querySelector(".admin-page").value-1);
    })

    document.querySelector(".admin-search").addEventListener("keyup", (e) => {
        console.log(document.querySelector(".admin-search").value);
        adminUserSearch(document.querySelector(".admin-search").value ,document.querySelector(".admin-page").value-1);
    })


    // List all quizzes and update or delete

    adminQuizListAll(document.querySelector(".admin-quiz-page").value-1);

    document.querySelector(".admin-quiz-page").addEventListener("keyup", (e) => {
        adminQuizListAll(document.querySelector(".admin-quiz-page").value-1);
    })

    document.querySelector(".admin-quiz-search").addEventListener("keyup", (e) => {
        console.log(document.querySelector(".admin-quiz-search").value);
        adminQuizList(document.querySelector(".admin-quiz-search").value ,document.querySelector(".admin-quiz-page").value-1);
    })


}

function userPanel(){ // User panel
    // Fill the page
    document.querySelector(".panel-items").innerHTML = `
    <div class="user-quiz">
    <h3>Your Quizzes</h3>
    <div class="user-quiz-list">
    </div>
    </div>
    <div class="user-control">
    <div class="user-control-alert"></div>
    <h3>User Control</h3>
    <input type="text" placeholder="Update your username" class="username-update">
    <input type="email" placeholder="Update your email" class="email-update">
    <input type="password" placeholder="Update your password" class="password-update">
    <button class="user-update">Update User</button>
    <button class="user-delete">Delete User</button>
    </div>
    `

    let username = localStorage.getItem("username"); // Get from local storage

    // All the quizzes you have created (Update or delete)
    fetch(`${window.API}/quiz/Search/${username}/100/0`, { // If anybody make more then 100 quizzes then its worth changing
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    }).then(data => {

        for (let i = 0; i < data.data.length; i++){ // Loop through all the quizzes
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

            quizUpdate.addEventListener("click", () => { // Update quiz
                transition();
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    panelPageUpdate(data.data[i]);
                }, 100)
            })

            quizDelete.addEventListener("click", () => { // Delete quiz
                if (confirm("Are you sure you want to delete this quiz?")){ // Confirm delete


                    console.log("Delete " + data.data[i].quiz_ID);

                    fetch(`${window.API}/quiz/Delete`, { // Delete quiz in API
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
                        panelPage(); // Panel page
                    }, 100);

                }
            })


        }

    }).catch((error) => {
        mainPage();
    })

    // Insert your current details

    document.querySelector(".username-update").value = localStorage.getItem("username");
    document.querySelector(".email-update").value = localStorage.getItem("email");
    document.querySelector(".password-update").value = localStorage.getItem("password");

    // Update your account.

    let userUpdate = document.querySelector(".user-update");
    let userDelete = document.querySelector(".user-delete");

    userUpdate.addEventListener("click", () => {




        if (confirm("Are you sure you want to update your account?")){ // If you want to update your account
            let username = document.querySelector(".username-update").value;
            let email = document.querySelector(".email-update").value;
            let password = document.querySelector(".password-update").value;
            let userID = parseInt(localStorage.getItem("user_ID"));


            // Filter input
            if (username == "" || email == "" || password == ""){
                alert("All fields are required!");
                return;
            }

            if (password.length < 6){
                alert("Password must be at least 6 characters!");
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                return (document.querySelector(".user-control-alert").innerHTML =
                  "Invalid email");
              }


            console.log(typeof username + " " + email + " " + password + " " + typeof userID);

            // Fetch update

                fetch(`${window.API}/user/Update`, { // Update user in API
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
                setTimeout(() => { // Reload page and clear local storage
                    localStorage.clear();
                    location.reload();
                    window.scrollTo(0, 0);
                }, 100)
        }
        
    })

    userDelete.addEventListener("click", () => { // Delete user
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
            setTimeout(() => { // Reload page and clear local storage
                localStorage.clear();
                location.reload();
                window.scrollTo(0, 0);
            }, 100);
        }

    })


    // Delete your account.
}

function adminUserSearchAll (page) { // Search all users in API

    if (document.querySelector(".admin-page").value === ""){ // If page is empty
        page = 0;
    }

    console.log(page);

    fetch(`${window.API}/admin/SearchAll/${10}/${page}`, { // Fetch all users by 10 per page
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(data => {

        // User data and update delete buttons
        document.querySelector(".admin-users-list").innerHTML = "";

        for (let i = 0; i < data.data.length; i++){
            let userList = document.querySelector(".admin-users-list");
            let userListItem = document.createElement("div");
            userListItem.classList.add("user-list-item-" + i);
            userListItem.innerHTML += `

            <p class="admin-username">${data.data[i].username}</p>
            <p class="admin-email">${data.data[i].email}</p>
            <div class="user-list-buttons">
            <button class="user-delete-${i}">Delete</button>
            </div>
            `
            userList.appendChild(userListItem);

            if (data.data[i].username === "admin"){
                document.querySelector(`.user-delete-${i}`).style.display = "none";
            }

            document.querySelector(`.user-delete-${i}`).addEventListener("click", () => {
                
                // Fetch delete
                console.log("Delete: " + data.data[i].ID);

            if (confirm("Are you sure you want to delete this user?")){
                
                fetch(`${window.API}/user/Delete`, { // Delete user if confirm
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }, body: JSON.stringify({
                        id : data.data[i].ID,
                    })
                }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    transition();
                    setTimeout(() => {
                        panelPage
                    }, 200)
                })

            }

            })
        }
    })
}

function adminUserSearch (input, page) { // Search users in API


    if (page < 0){
        page = 0;
    }

    if (document.querySelector(".admin-search").value === ""){ // If page is empty
        page = 0;
        console.log(page);
        adminUserSearchAll(page);
    }

    fetch(`${window.API}/admin/Search/${input}/${10}/${page}`, { // Fetch all users by 10 per page
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(data => { // User data and update delete buttons
        document.querySelector(".admin-users-list").innerHTML = "";
        for (let i = 0; i < data.data.length; i++){
            let userList = document.querySelector(".admin-users-list");
            let userListItem = document.createElement("div");
            userListItem.classList.add("user-list-item-" + i);
            userListItem.innerHTML += `

            <p class="admin-username">${data.data[i].username}</p>
            <p class="admin-email">${data.data[i].email}</p>
            <div class="user-list-buttons">
            <button class="user-delete-${i}">Delete</button>
            </div>
            `
            userList.appendChild(userListItem);

            if (data.data[i].username === "admin"){
                document.querySelector(`.user-delete-${i}`).style.display = "none";
            }

            document.querySelector(`.user-delete-${i}`).addEventListener("click", () => {
                
                // Fetch delete
                console.log("Delete: " + data.data[i].ID);

                if (confirm("Are you sure you want to delete this user?")){
                
                    fetch(`${window.API}/user/Delete`, { // Delete user if confirm
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }, body: JSON.stringify({
                            id : data.data[i].ID,
                        })
                    }).then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        transition();
                        setTimeout(() => {
                            panelPage(); // Reload page
                        }, 200)
                    })
                }    

            })
        }
    })
}

function adminQuizListAll (page) { // Fetch all quizzes in API

    fetch(`${window.API}/quiz/SearchAll/${10}/${page}`, { // Fetch all quizzes
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No page found");
          }
        })
        .then((data) => {
            console.log(data);
            // Quiz data list with buttons, update and delete
            document.querySelector(".admin-quiz-list").innerHTML = "";
            for (let i = 0; i < data.data.length; i++) {
                let quizList = document.querySelector(".admin-quiz-list");
                let quizListItem = document.createElement("div");
                quizListItem.classList.add("quiz-list-item-" + i);
                quizListItem.innerHTML += `
                <p class="admin-quiz-title">${data.data[i].title}</p>
                <p class="admin-quiz-username">${data.data[i].username}</p>
                <div class="admin-quiz-list-buttons">
                <button class="quiz-update-${i}">Update</button>
                <button class="quiz-delete-${i}">Delete</button>
                </div>
                `
                quizList.appendChild(quizListItem);

                document.querySelector(`.quiz-update-${i}`).addEventListener("click", () => {
                    transition();
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    panelPageUpdate(data.data[i]); // Go to update page with quiz data
                }, 100)
                })

                document.querySelector(`.quiz-delete-${i}`).addEventListener("click", () => {
                    if (confirm("Are you sure you want to delete your account?")){

                        // Fetch delete (Update to anonymous account)
                        fetch (`${window.API}/quiz/Delete`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify({
                                id: data.data[i].quiz_ID,
                            })
                        })
            
                        transition();
                        setTimeout(() => {
                            panelPage();
                            window.scrollTo(0, 0);
                        }, 100);
                    }
                })

            }
            })
}

function adminQuizList (input, page) { // Search quizzes in API

    if (page < 0){
        page = 0;
    }

    if (document.querySelector(".admin-quiz-search").value === ""){ // If page is empty
        page = 0;
        console.log(page);
        adminQuizListAll(page);
    }

    fetch(`${window.API}/quiz/Search/${input}/${10}/${page}`, { // Fetch all quizzes by 10 per page in API
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((data) => {
            // Quiz data list with buttons, update and delete
            document.querySelector(".admin-quiz-list").innerHTML = "";
            for (let i = 0; i < data.data.length; i++) {
                let quizList = document.querySelector(".admin-quiz-list");
                let quizListItem = document.createElement("div");
                quizListItem.classList.add("quiz-list-item-" + i);
                quizListItem.innerHTML += `
                <p class="admin-quiz-title">${data.data[i].title}</p>
                <p class="admin-quiz-username">${data.data[i].username}</p>
                <div class="admin-quiz-list-buttons">
                <button class="quiz-update-${i}">Update</button>
                <button class="quiz-delete-${i}">Delete</button>
                </div>
                `
                quizList.appendChild(quizListItem);

                document.querySelector(`.quiz-update-${i}`).addEventListener("click", () => {
                    transition();
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    panelPageUpdate(data.data[i]); // Go to update page with quiz data
                }, 100)
                })

                document.querySelector(`.quiz-delete-${i}`).addEventListener("click", () => {
                    if (confirm("Are you sure you want to delete your account?")){

                        // Fetch delete (Update to anonymous account)
                        fetch (`${window.API}/quiz/Delete`, { // Fetch delete
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify({
                                id: data.data[i].quiz_ID,
                            })
                        })
            
                        transition();
                        setTimeout(() => {
                            panelPage();
                            window.scrollTo(0, 0);
                        }, 100);
                    }
                })
            }
        })
}

export { panelPage };