import { panelPage } from "./panel.js";
import { mainPage, transition, userID } from "../index.js";


async function panelPageUpdate(panelData) {
    console.log(panelData);
    document.querySelector("main").innerHTML = `
    <div class="panel-update-container">

    <div class="panel-update-buttons">
    <button class="back-button-panel">Back</button>
    <button class="update-button">Update</button>
    </div>

    <div class="quiz-update-box">
    <div class="quiz-update-alert"></div>
    <h3> Quiz </h3>
    <input class="quiz-update-title" type="text" placeholder="Quiz Title..." value="${panelData.title}" required>
    <textarea class="quiz-update-description" type="text" placeholder="Quiz Description..." maxlength="58" width="100%" rows="5">${panelData.description}</textarea>
    <input class="quiz-update-image" type="text" placeholder="Quiz Image URL..." value="${panelData.image}" required>
    <img class="quiz-update-image-preview" src="" alt="Image Preview">

    <button class="add-question-update-button">Add Question</button>
    <button class="remove-question-button">Remove Question</button>

    <div>
    </div>
    `
    questionAmount(panelData);
    setTimeout(() => {
        
         questionBox(panelData.quiz_ID);
            
        document.querySelector(".back-button-panel").addEventListener("click", () => {
            transition();
            setTimeout(() => {
                panelPage();
            }, 100)
        })

        document.querySelector(".remove-question-button").addEventListener("click", () => {
            questionBoxRemove();
        })

        document.querySelector(".add-question-update-button").addEventListener("click", () => {
            questionUpdateBoxAdd(panelData.quiz_ID);
        })

        document.querySelector(".update-button").addEventListener("click", () => {
           
            let title = document.querySelector(".quiz-update-title").value;
            let description = document.querySelector(".quiz-update-description").value;
            let user_ID = localStorage.getItem("user_ID");
            let image = document.querySelector(".quiz-update-image").value;

            let isValid = true;

            if (user_ID === "") {
            alert("Please login again or contact admin for support");
            mainPage();
            }


            if (title === "" || description === "" || user_ID === "" || image === "") {
                document.querySelector(".quiz-update-alert").innerHTML = "All fields are required";
                isValid = false;
            } else {
            document.querySelector(".quiz-update-alert").innerHTML = "";
            }

            if (localStorage.getItem("questionAmount") < 1) {
            document.querySelector(".create-alert").innerHTML = "You must add at least one question";
            isValid = false;
            }

            for (let i = 1; i <= localStorage.getItem("questionAmount"); i++) {
                let question = document.querySelector(`.question-update-title-${i}`).value;
                let QuestionImage = document.querySelector(`.question-update-image-${i}`).value;
                let choiceItems = document.querySelectorAll(`.question-choice-container-${i} .choice-item`);
          
                    if (choiceItems.length < 1 || question === "" || QuestionImage === "") {
                      document.querySelector(`.question-update-alert-${i}`).innerHTML = "All fields are required and one choice";
                      isValid = false;
                    } else {
                      document.querySelector(`.question-update-alert-${i}`).innerHTML = "";
                    }
                
              }

            if (!isValid) {
                return;
              }
           
        
            quizUpdate(panelData.amount_done, panelData.quiz_ID);
            transition();
            setTimeout(() => {
              document.querySelector("header").style.display = "flex";
              document.querySelector("footer").style.display = "flex";
              panelPage();
            }, 500);
        })

           // Quiz image preview
        const imageInput = document.querySelector(`.quiz-update-image`);
        const imagePreview = document.querySelector(`.quiz-update-image-preview`);
        imagePreview.src = imageInput.value;

        imageInput.addEventListener("input", () => {
            imagePreview.src = imageInput.value;
        });
        
        imagePreview.onerror = () => {
            console.log("Error");
            imagePreview.style.display = "none";
        };
        
        imagePreview.onload = () => {
            imagePreview.style.display = "block";
        };

    }, 100)

}


async function questionBox (quiz_ID){

    for (let i = 1; i <= parseInt(localStorage.getItem("questionAmount")); i++){

    await fetch(window.API+`/quiz/QuestionSearch/${quiz_ID}/${i}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((res) => res.json())
    .then((data) => {

    const questionBox = document.createElement("div");
    questionBox.className = "question-box-update";
    questionBox.id = `question-box-${i}`;
    questionBox.innerHTML += `
    <div class="question-update-alert-${i}"></div>
    <h3> Question ${i} </h3>
    <input class="question-update-title-${i}" type="text" value="${data.data[0].question}" placeholder="Question Title..."  required>

    <input class="question-update-image-${i}" type="text" value="${data.data[0].image}" placeholder="Question Image.."  required>
    <img class="question-update-image-preview-${i}" src="" alt="Image Preview">

    <textarea class="question-update-description-${i}" type="text" placeholder="Question Description...">${data.data[0].description}</textarea>
    
    <input class="question-update-choice-input-${i}" type="text" placeholder="Enter a choice..."></input>
    <button class="question-update-add-choice-button-${i}">Add Choice</button>
    <div class="question-choice-container-${i}"></div>

    `
    document.querySelector(".panel-update-container").appendChild(questionBox); 

    // Query select on a existing object??!!???
    const choiceInput = questionBox.querySelector(`.question-update-choice-input-${i}`);
    const choicesContainer = questionBox.querySelector(`.question-choice-container-${i}`);
    const addChoiceButton = questionBox.querySelector(`.question-update-add-choice-button-${i}`);
    
    const correctAnswer = data.data[0].correct_answer.split(";");
    const choices = data.data[0].choice.split(";");

    for (let j = 0; j < choices.length; j++) {
        const choiceItem = document.createElement("div");
        choiceItem.className = "choice-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        if (correctAnswer.includes(`${j+1}`)) {
            checkbox.checked = true;
        }

        const choiceText = document.createElement("span");
        choiceText.textContent = data.data[0].choice.split(";")[j];

        const removeButton = document.createElement("button");
        removeButton.className = "remove-choice-button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            choiceItem.remove();
        })

        choiceItem.appendChild(checkbox);
        choiceItem.appendChild(choiceText);
        choiceItem.appendChild(removeButton);

        choicesContainer.appendChild(choiceItem);
        choiceInput.value = "";
    

    }



  addChoiceButton.addEventListener("click", () => {
    const choice = choiceInput.value.trim(); // Remove whitespace
    if (choice !== "") { // If choice is not empty
      const choiceItem = document.createElement("div"); // Create div for choice item
      choiceItem.className = "choice-item"; // Add class to div

      const checkbox = document.createElement("input"); // Create checkbox
      checkbox.type = "checkbox"; // Add type

      const choiceText = document.createElement("span"); // Create text
      choiceText.textContent = choice; // Add text

      const removeButton = document.createElement("button"); // Create button
      removeButton.className = "remove-choice-button"; // Add class
      removeButton.textContent = "Remove"; // Add text
      removeButton.addEventListener("click", () => { // Add event listener
        choiceItem.remove();  // Remove
      });

      choiceItem.appendChild(checkbox); // Add checkbox
      choiceItem.appendChild(choiceText); // Add text
      choiceItem.appendChild(removeButton); // Add remove

      choicesContainer.appendChild(choiceItem); // Add item
      choiceInput.value = ""; // Clear input
    }
  });


     // Add event listener to the image input field to update the image preview
  const imageInput = questionBox.querySelector(`.question-update-image-${i}`);
  const imagePreview = questionBox.querySelector(`.question-update-image-preview-${i}`);
  imagePreview.src = imageInput.value;

  imageInput.addEventListener("input", () => {
    imagePreview.src = imageInput.value;
  });

  imagePreview.onerror = () => {
    imagePreview.style.display = "none";
  };
  
  imagePreview.onload = () => {
    imagePreview.style.display = "block";
  };

})
    }
 }

function questionUpdateBoxAdd(quiz_ID) {
    localStorage.setItem("questionAmount", parseInt(localStorage.getItem("questionAmount")) + 1);

    const questionBox = document.createElement("div");
    questionBox.className = "question-box-update";
    questionBox.id = `question-box-${parseInt(localStorage.getItem("questionAmount"))}`;
    questionBox.innerHTML += `
    <div class="question-update-alert-${parseInt(localStorage.getItem("questionAmount"))}"></div>
    <h3> Question ${parseInt(localStorage.getItem("questionAmount"))} </h3>
    <input class="question-update-title-${parseInt(localStorage.getItem("questionAmount"))}" type="text" placeholder="Question Title..."  required>

    <input class="question-update-image-${parseInt(localStorage.getItem("questionAmount"))}" type="text" placeholder="Question Image..."  required>
    <img class="question-update-image-preview-${parseInt(localStorage.getItem("questionAmount"))}" src="" alt="Image Preview">

    <textarea class="question-update-description-${parseInt(localStorage.getItem("questionAmount"))}" type="text" placeholder="Question Description..."></textarea>
    <input class="question-update-choice-input-${parseInt(localStorage.getItem("questionAmount"))}" type="text" placeholder="Enter a choice..."></input>
    <button class="question-update-add-choice-button-${parseInt(localStorage.getItem("questionAmount"))}">Add Choice</button>
    <div class="question-choice-container-${parseInt(localStorage.getItem("questionAmount"))}"></div>
    `;

    document.querySelector(".panel-update-container").appendChild(questionBox);

    const choiceInput = questionBox.querySelector(`.question-update-choice-input-${parseInt(localStorage.getItem("questionAmount"))}`);
    const choicesContainer = questionBox.querySelector(`.question-choice-container-${parseInt(localStorage.getItem("questionAmount"))}`);
    const addChoiceButton = questionBox.querySelector(`.question-update-add-choice-button-${parseInt(localStorage.getItem("questionAmount"))}`);
    

    addChoiceButton.addEventListener("click", () => {
        const choice = choiceInput.value.trim(); // Remove whitespace
        if (choice !== "") { // If choice is not empty
          const choiceItem = document.createElement("div"); // Create div for choice item
          choiceItem.className = "choice-item"; // Add class to div
    
          const checkbox = document.createElement("input"); // Create checkbox
          checkbox.type = "checkbox"; // Add type
    
          const choiceText = document.createElement("span"); // Create text
          choiceText.textContent = choice; // Add text
    
          const removeButton = document.createElement("button"); // Create button
          removeButton.className = "remove-choice-button"; // Add class
          removeButton.textContent = "Remove"; // Add text
          removeButton.addEventListener("click", () => { // Add event listener
            choiceItem.remove();  // Remove
          });
    
          choiceItem.appendChild(checkbox); // Add checkbox
          choiceItem.appendChild(choiceText); // Add text
          choiceItem.appendChild(removeButton); // Add remove
    
          choicesContainer.appendChild(choiceItem); // Add item
          choiceInput.value = ""; // Clear input
        }
      });


     // Add event listener to the image input field to update the image preview
  const imageInput = questionBox.querySelector(`.question-update-image-${parseInt(localStorage.getItem("questionAmount"))}`);
  const imagePreview = questionBox.querySelector(`.question-update-image-preview-${parseInt(localStorage.getItem("questionAmount"))}`);

  imageInput.addEventListener("input", () => {
    imagePreview.src = imageInput.value;
  });

  imagePreview.onerror = () => {
    console.log("Error");
    imagePreview.style.display = "none";
  };
  
  imagePreview.onload = () => {
    console.log("Image loaded successfully");
    imagePreview.style.display = "block";
  };
}

function questionAmount(panelData) {
    
    fetch(window.API+`/quiz/QuestionAmountByQuizID/${panelData.quiz_ID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((res) => res.json())
    .then((data) => {
        localStorage.setItem("questionAmount", data.data[0].question_amount);
    })

}

async function quizUpdate(amountDone, originalQuizID) {

    // Delete quiz and questions
    await fetch(`${window.API}/quiz/Delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            id : originalQuizID,
        })
        
    }).then((res) => res.json())
    .then((data) => {
        console.log("Deleted: " + data);
    })

    // Add quiz and all questions

        // All the inputs for the quiz : title, description, user_ID, image
        let title = document.querySelector(".quiz-update-title").value;
        let description = document.querySelector(".quiz-update-description").value;
        let user_ID = localStorage.getItem("user_ID");
        let image = document.querySelector(".quiz-update-image").value;
    
        console.log("Quiz_Title: '" +title+ "' Quiz_Description: '"+ description + "' User_ID: '"+ user_ID + "' Image: '"+ image + "'");
    
    // Fetch quiz post
    await fetch(`${window.API}/quiz/Create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: title,
            description: description,
            user_ID: user_ID,
            image: image,
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);

        // Amount done add
        setTimeout(() => {
            fetch(`${window.API}/quiz/SearchByTitle/${title}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let newQuizID = data.data[0].ID;
                console.log(newQuizID);
                localStorage.setItem("newQuizID", newQuizID);

        // All the inputs from questions : quiz_ID, question, image, question_num, description, choice, correct_answer, last
        for (let i = 1; i <= localStorage.getItem("questionAmount"); i++) {
        console.log(i);
        console.log(document.querySelector(`.question-update-title-1`).value);
        
        let quiz_ID = data.data[0].ID;
        let question = document.querySelector(`.question-update-title-${i}`).value;
        let questionImage = document.querySelector(`.question-update-image-${i}`).value;
        let question_num = i;
        let questionDescription = document.querySelector(`.question-update-description-${i}`).value;
        
        let last = 0;
        if (i == localStorage.getItem("questionAmount")) {
          last = 1;
        }

        const choiceItems = document.querySelectorAll(`.question-choice-container-${i} .choice-item`);

        let choices = [];
        let choiceNumber = [];
    
            for (let j = 0; j < choiceItems.length; j++) {
            const checkbox = choiceItems[j].querySelector("input[type='checkbox']");
            choices.push(checkbox.nextElementSibling.textContent);
            if (checkbox.checked) {
              choiceNumber.push(j + 1);
              }
        }
        choices = choices.join(";");
        choiceNumber = choiceNumber.join(";"); 

        console.log("Quiz ID; '"+ quiz_ID+"' Question_Title: '" +question+ "' Image: '"+ questionImage + "' Question number: '"+ question_num + "' Question_Description: '"+ questionDescription + "' Question_Choices: '"+ choices + "' Correct_Answer: '"+ choiceNumber + "' Last: '"+ last);
    
        fetch(`${window.API}/quiz/QuestionCreate`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                quiz_ID : quiz_ID,
                question: question,
                image: questionImage,
                question_num: question_num,
                description: questionDescription,
                choice: choices,
                correct_answer: choiceNumber,
                last: last,
            })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
            })
    
    }


    })

    // Amount done add
    console.log(amountDone);
    console.log(parseInt(localStorage.getItem("newQuizID")));
    
    setTimeout(() => {
        fetch(`${window.API}/quiz/AmountDone`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                amount_done: amountDone,
                id: parseInt(localStorage.getItem("newQuizID")),
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Amount done added");
            console.log(data.data);
        })
    }, 300)

    }, 300)


    })

}

function questionBoxRemove() {
    const createFormQuestion = document.querySelector(".panel-update-container");
    const createQuestionBoxes = createFormQuestion.querySelectorAll(".question-box-update");
    
    if (createQuestionBoxes.length > 0) {
      const lastQuestionBox = createQuestionBoxes[createQuestionBoxes.length - 1];
      lastQuestionBox.remove();
      
      // Update the value of "createQuestion" in localStorage
      localStorage.setItem("questionAmount", createQuestionBoxes.length - 1);
    }
  
    
  }

export { panelPageUpdate }