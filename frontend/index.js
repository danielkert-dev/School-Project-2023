import { authPage,
} from "./auth/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    header();
    footer();
    titleClick();
})

function header() {
    document.querySelector("header").innerHTML = `
    <h1 class="title">GUESS RIGHT</h1>

    <div class="header-objects">

    <div class="user-info"></div>

        <button class="login-signup"'>Log-in / Sign-up</button>
    </div>

    </div>
    `;

    document.querySelector(".login-signup").addEventListener("click", authPage);
}

function footer() {
    document.querySelector("footer").innerHTML = `
    © ${new Date().getFullYear()} - Daniel Kertsmik
    `    
}

function titleClick() {
    document.querySelector(".title").addEventListener("click", () => {
        document.querySelector("main").innerHTML = ``
    })
}