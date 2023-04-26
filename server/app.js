//! Imports
require("dotenv").config(); // import dotenv config
const fs = require("fs"); // import fs
const express = require("express"); // import express
const app = express(); // create express app
const cors = require("cors"); // import cors
const path = require("path"); // import path for static files

//! Routers

//! Middlewares
app.use(express.json()); // parse json
app.use(cors()); // allow cors

//! Routes
//? Users
app.use("/user", require("./api/users/user.router.js")); // import user data

//? Quiz
app.use("/quiz", require("./api/quiz/quiz.router.js")); // import quiz data'

//? Questions
app.use("/question", require("./api/quiz/question.router.js")); // import question data

//? Leaderboard

app.use("/leaderboard", require("./api/leaderboard/leaderboard.router.js")); // import leaderboard data

//? Admin

//? Main (API guide)
app.use(express.static(path.join(__dirname)))
app.get('/',(req,res)=>{
    res.sendFile('index.html')
  })

//! Server
app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port http://localhost:${process.env.APP_PORT}`);
})
