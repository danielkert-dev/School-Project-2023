function quizPage(page, pageSize) {
    
    fetch(`${window.API}/quiz/SearchAll/${page}/${pageSize}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then ((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Wrong input");
        }
    }).then((data) => {
        console.log(data.data);
        document.querySelector("main").innerHTML += `
            <div class="quiz-container"></div>
            `
        for (let i = 0; i < data.data.length; i++) {
            
            document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box" id="quiz-box-${i}">
            <p>${data.data[i].title }</p>
            <img class="quiz-image" src="${data.data[i].image}">
            <p>${data.data[i].desctiption}</p>
            <p>${data.data[i].username}</p>
            </div>
            `}
            document.querySelector(".page-number").value = parseInt(localStorage.getItem("page")) + 1;

        setTimeout(() => {

            for (let i = 0; i < 20 - data.data.length; i++) {
                document.querySelector(".quiz-container").innerHTML += `
                <div class="quiz-box-empty">
                Quiz
                </div>
                `
            }
        }, 100);
    })
    .catch((error) => {
        console.log(error);
        document.querySelector("main").innerHTML += `
            <div class="quiz-container"></div>
            `
        for (let i = 0; i < 20; i++) {
            document.querySelector(".quiz-container").innerHTML += `
            <div class="quiz-box-empty">
            Quiz
            </div>
            `
            document.querySelector(".page-number").value = parseInt(localStorage.getItem("page"))+1;
        }
    })
    
}

export { quizPage }