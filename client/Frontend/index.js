window.addEventListener("DOMContentLoaded", function () {
    initIndex();

});

function initIndex() {

    document.querySelector(".background").style.backgroundColor = "#1e1e1e";
    setTimeout(() => {
        document.querySelector(".background").style.opacity = "0";
    }, Math.random() * (800 - 400) + 400);


    document.querySelector(".login").innerHTML = `
    <input type="text" placeholder="Username..." class="username"><br>
    <input type="password" placeholder="Password..." class="password">
    `
}