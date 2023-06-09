import { mainPage, transition, userID } from "../index.js";

// quiz/Create

async function createPage() {
  window.scrollTo(0, 0); // scroll to top
  userID(); // get user ID and some other values
  document.querySelector(".burger-button").style.opacity = "0"; // Style changes
  document.querySelector(".burger-button").style.pointerEvents = "none";
  document.querySelector("footer").style.display = "none";
  document.querySelector(".leaderboard").style.opacity = "0";
  document.querySelector(".leaderboard").style.pointerEvents = "none";
  document.querySelector(".create").style.opacity = "0";
  document.querySelector(".create").style.pointerEvents = "none";
  document.querySelector(".panel").style.opacity = "0";
  document.querySelector(".panel").style.pointerEvents = "none";
  document.querySelector(".login-signup").style.opacity = "0";
  document.querySelector(".search").innerHTML = ``;

  localStorage.setItem("createQuestion", 0); // Reset local storage createQuestion

  // Create Quiz Page fill
  document.querySelector("main").innerHTML = `
    <div class="create-quiz-container">

    <div class="create-body">
    
    <div class="create-button-container">
    <button class="back-button">Home</button>
    <button class="create-button">Create Quiz</button>
    </div>

    <div class="create-form-quiz">
    <div class="create-alert"></div>
    <h3>Quiz</h3>


    <input class="create-form-quiz-title" type="text" placeholder="Quiz Title..."  required>
    <textarea class="create-form-quiz-description" type="text" placeholder="Quiz Description..." maxlength="58" width="100%" rows="5"></textarea>
    <input class="create-form-quiz-image" type="text" placeholder="Quiz Image URL..."  required>
    <img class="quiz-image-preview" src="" alt="Image Preview">


    <button class="add-question-button">Add Question</button>
    <button class="remove-question-button">Remove Question</button>
    </div>

    <div class="create-form-question">
    </div>


    </div>
    </div>
  `;

  document.querySelector(".add-question-button").addEventListener("click", () => { // Add Question box
      questionBoxAdd();
    });

  document.querySelector(".remove-question-button").addEventListener("click", () => { // Remove Question box
      questionBoxRemove();
  })

  document.querySelector(".create-button").addEventListener("click", () => { // Create Quiz button

    let title = document.querySelector(".create-form-quiz-title").value;
    let description = document.querySelector(".create-form-quiz-description").value;
    let user_ID = localStorage.getItem("user_ID");
    let image = document.querySelector(".create-form-quiz-image").value;

    let isValid = true;

    if (user_ID === "") { // If user is not logged in
      alert("Please login again or contact admin for support");
      mainPage();
    }


    if (title === "" || description === "" || user_ID === "" || image === "") { // If all fields are empty
        document.querySelector(".create-alert").innerHTML = "All fields are required";
        isValid = false;
    } else {
      document.querySelector(".create-alert").innerHTML = "";
    }

    if (localStorage.getItem("createQuestion") < 1) { // If no questions
      document.querySelector(".create-alert").innerHTML = "You must add at least one question";
      isValid = false;
    }

    for (let i = 1; i <= localStorage.getItem("createQuestion"); i++) {  // For each question
      let question = document.querySelector(`.question-title-${i}`).value;
      let QuestionImage = document.querySelector(`.question-image-${i}`).value;
      let choiceItems = document.querySelectorAll(`.choices-container-${i} .choice-item`);

          if (choiceItems.length < 1 || question === "" || QuestionImage === "") { // If all fields are empty
            document.querySelector(`.create-alert-question-${i}`).innerHTML = "All fields are required and one choice";
            isValid = false;
          } else {
            document.querySelector(`.create-alert-question-${i}`).innerHTML = "";
          }
      
    }

    if (!isValid) { // If not valid
      return;
    }

    quizAdd(); // Create Quiz
    document.querySelector("body").style.opacity = "0";
    setTimeout(() => {
      transition();
      document.querySelector("body").style.opacity = "1";
      setTimeout(() => {
        document.querySelector("header").style.display = "flex";
        document.querySelector("footer").style.display = "flex";
        mainPage(); // Go to main page
      },100)
    }, 2000);
    });


  document.querySelector(".back-button").addEventListener("click", () => { // Back button
    transition();
    setTimeout(() => {
      document.querySelector("header").style.display = "flex";
      document.querySelector("footer").style.display = "flex";
      mainPage(); // Go to main page
    }, 100);
  });

   // Quiz image preview
   const imageInput = document.querySelector(`.create-form-quiz-image`);
   const imagePreview = document.querySelector(`.quiz-image-preview`);


   imageInput.addEventListener("input", () => { // Quiz image
     imagePreview.src = imageInput.value;
   });
 
   imagePreview.onerror = () => { // Quiz image error
     console.log("Error");
     imagePreview.style.display = "none";
   };
   
   imagePreview.onload = () => { // Quiz image loaded
     console.log("Image loaded successfully");
     imagePreview.style.display = "block";
   };

}

function questionBoxAdd() { // Add Question box
  localStorage.setItem("createQuestion", parseInt(localStorage.getItem("createQuestion")) + 1); // Increment question number

  const questionBox = document.createElement('div');  // Create question box
  questionBox.className = 'create-question-box';
  questionBox.id = `create-question-${localStorage.getItem("createQuestion")}`;
  questionBox.innerHTML = `
  <div class="create-alert-question-${localStorage.getItem("createQuestion")} question-alert"></div>
    <h3>Question ${localStorage.getItem("createQuestion")}</h3>

    <input class="question-title-${localStorage.getItem("createQuestion")}" type="text" placeholder="Question Title..."  required>
    
    <input class="question-image-${localStorage.getItem("createQuestion")}" type="text"placeholder="Question Image..."  required>
    <img class="question-image-preview-${localStorage.getItem("createQuestion")}" src="" alt="Image Preview">
    
    <textarea class="question-description-${localStorage.getItem("createQuestion")}" type="text" placeholder="Question Description..." maxlength="58" width="100%" rows="5"></textarea>
    <input class="choice-input-${localStorage.getItem("createQuestion")}" type="text" placeholder="Enter a choice...">
    <button class="add-choice-button-${localStorage.getItem("createQuestion")}">Add Choice</button>
    <div class="choices-container-${localStorage.getItem("createQuestion")}"></div>
    `;

  document.querySelector(".create-form-question").appendChild(questionBox); 



  // Query select on a existing object??!!???
  const choiceInput = questionBox.querySelector(`.choice-input-${localStorage.getItem("createQuestion")}`);
  const choicesContainer = questionBox.querySelector(`.choices-container-${localStorage.getItem("createQuestion")}`);
  const addChoiceButton = questionBox.querySelector(`.add-choice-button-${localStorage.getItem("createQuestion")}`);

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
  const imageInput = questionBox.querySelector(`.question-image-${localStorage.getItem("createQuestion")}`);
  const imagePreview = questionBox.querySelector(`.question-image-preview-${localStorage.getItem("createQuestion")}`);

  imageInput.addEventListener("input", () => { // Quiz image input
    imagePreview.src = imageInput.value;
  });

  imagePreview.onerror = () => { // Quiz image error
    imagePreview.style.display = "none";
  };
  
  imagePreview.onload = () => { // Quiz image loaded
    console.log("Image loaded successfully");
    imagePreview.style.display = "block";
  };
}

function questionBoxRemove() { // Remove Question box
  const createFormQuestion = document.querySelector(".create-form-question");
  const createQuestionBoxes = createFormQuestion.querySelectorAll(".create-question-box");
  
  if (createQuestionBoxes.length > 0) {
    const lastQuestionBox = createQuestionBoxes[createQuestionBoxes.length - 1];
    lastQuestionBox.remove();
    
    // Update the value of "createQuestion" in localStorage
    localStorage.setItem("createQuestion", createQuestionBoxes.length - 1);
  }

  
}

/*function questionBoxRemove(questionIndex) {
  const createFormQuestion = document.querySelector(".create-form-question");
  const questionBoxToRemove = createFormQuestion.querySelector(`#create-question-${questionIndex}`);
  
  if (questionBoxToRemove) {
    questionBoxToRemove.remove();
    const remainingQuestionBoxes = createFormQuestion.querySelectorAll(".create-question-box");

    // Update the value of "createQuestion" in localStorage
    localStorage.setItem("createQuestion", remainingQuestionBoxes.length);

    // Update the question indices in the DOM
    remainingQuestionBoxes.forEach((questionBox, index) => {
      const questionNumber = index + 1;
      questionBox.id = `create-question-${questionNumber}`;
      questionBox.querySelector(`.question-alert`).className = `create-alert-question-${questionNumber} question-alert`;
      questionBox.querySelector(`.question-title-${questionIndex}`).className = `question-title-${questionNumber}`;
      questionBox.querySelector(`.question-image-${questionIndex}`).className = `question-image-${questionNumber}`;
      questionBox.querySelector(`.question-image-preview-${questionIndex}`).className = `question-image-preview-${questionNumber}`;
      questionBox.querySelector(`.question-description-${questionIndex}`).className = `question-description-${questionNumber}`;
      questionBox.querySelector(`.choice-input-${questionIndex}`).className = `choice-input-${questionNumber}`;
      questionBox.querySelector(`.add-choice-button-${questionIndex}`).className = `add-choice-button-${questionNumber}`;
      questionBox.querySelector(`.choices-container-${questionIndex}`).className = `choices-container-${questionNumber}`;
    });
  }
}*/


async function quizAdd() { // Add Quiz
    // All the inputs for the quiz : title, description, user_ID, image
    let title = document.querySelector(".create-form-quiz-title").value;
    let description = document.querySelector(".create-form-quiz-description").value;
    let user_ID = localStorage.getItem("user_ID");
    let image = document.querySelector(".create-form-quiz-image").value;

    console.log("Quiz_Title: '" +title+ "' Quiz_Description: '"+ description + "' User_ID: '"+ user_ID + "' Image: '"+ image + "'");

    // Fetch quiz post
    await fetch(`${window.API}/quiz/Create`, { // Create quiz in API
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

    // All the inputs from questions : quiz_ID, question, image, question_num, description, choice, correct_answer, last

    setTimeout(() => { // Wait for the page to load
        fetch(`${window.API}/quiz/SearchByTitle/${title}`, { // Search quiz in API
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            console.log(data);
            let quiz_ID = data.data[0].ID;
            
    for (let i = 1; i <= localStorage.getItem("createQuestion"); i++) {

    console.log(i);


    let question = document.querySelector(`.question-title-${i}`).value;
    let image = document.querySelector(`.question-image-${i}`).value;
    let question_num = i;
    let description = document.querySelector(`.question-description-${i}`).value;
    // let choice = document.querySelector(`.question-choices-${i}`).value;

    let last = 0;
    if (i == localStorage.getItem("createQuestion")) {
      last = 1;
    }

    // Choices 

    // Correct answer

    const choiceItems = document.querySelectorAll(`.choices-container-${i} .choice-item`);

    let choices = [];
    let choiceNumber = [];

        for (let j = 0; j < choiceItems.length; j++) {
        const checkbox = choiceItems[j].querySelector("input[type='checkbox']");
        choices.push(checkbox.nextElementSibling.textContent);
        if (checkbox.checked) {
          choiceNumber.push(j + 1);
          }
    }
    choices = choices.join(";"); // Join the choices 
    choiceNumber = choiceNumber.join(";");  // Join the choice answers

    // console.log(`Question ${i} - Choices: ${choices}, Choice Number: ${choiceNumber}`);


    console.log("Quiz ID; '"+ quiz_ID+"' Question_Title: '" +question+ "' Image: '"+ image + "' Question number: '"+ question_num + "' Question_Description: '"+ description + "' Question_Choices: '"+ choices + "' Correct_Answer: '"+ choiceNumber + "' Last: '"+ last);

    // Fetch questions post
    await fetch(`${window.API}/quiz/QuestionCreate`, { // Create question in API
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            quiz_ID : quiz_ID,
            question: question,
            image: image,
            question_num: question_num,
            description: description,
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
    });

  }, 1000)
})

}
export { createPage };
