//! Imports
require("dotenv").config(); // import dotenv config
const fs = require("fs"); // import fs
const express = require("express"); // import express
const app = express(); // create express app
const cors = require("cors"); // import cors

//! Routers

//! Middlewares
app.use(express.json()); // parse json
app.use(cors()); // allow cors

//! Routes
//? Users
app.use("/users", require("./api/users/user.router.js")); // import user data

//? Quiz
app.use("/quiz", require("./api/quiz/quiz.router.js")); // import quiz data'

//? Questions
app.use("/questions", require("./api/question/question.router.js")); // import question data

// Main
app.use("/", (req, res) => { 
    res.writeHead(200, {"Content-Type": "text/json"});
    res.write("By Daniel Kertsmik");
})

//! Server
app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`);
})
