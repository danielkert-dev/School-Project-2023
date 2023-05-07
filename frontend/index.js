import {login, signup, logout} from "./auth/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    header();
    footer();
})

function header() {
    document.querySelector("header").innerHTML = `
    <h1>GUESS RIGHT</h1>
    `
}

function footer() {
    document.querySelector("footer").innerHTML = `
    © ${new Date().getFullYear()} - Daniel Kertsmik
    `    
}