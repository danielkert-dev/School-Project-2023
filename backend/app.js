require("dotenv").config(); // import dotenv
const express = require("express"); // import express
const app = express(); // create express app
const cors = require("cors"); // import cors
const path = require("path"); // import path

app.use(express.json()); // Middleware parse
app.use(cors()); // Middleware cors

//? Documentation
app.use(express.static(path.join(__dirname, "public/doc")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/doc/doc.html"));
});

//? User
app.use("/user", require("./api/user/user.router"));

//? Quiz
app.use("/quiz", require("./api/quiz/quiz.router"));

//? Admin

//? Default
app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
