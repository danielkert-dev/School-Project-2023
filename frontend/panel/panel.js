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
    
}

function adminPanel(){


}

function userPanel(){

}

export { panelPage };