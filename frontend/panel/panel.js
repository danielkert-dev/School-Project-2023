import { mainPage, transition } from "../index.js";

function panelPage(){
    document.querySelector("footer").style.display = "none";
    document.querySelector(".header-objects").style.display = "none";
    document.querySelector(".search").innerHTML = ``;

    document.querySelector("main").innerHTML = `
    <div class="panel-control-buttons">
    <button class="back-button">Home</button>
    <button class="panel-tutorial">Tutorial</button>
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