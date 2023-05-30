require("dotenv").config(); // import dotenv
const express = require("express"); // import express
const app = express(); // create express app
const cors = require("cors"); // import cors
const path = require("path"); // import path


app.use(express.json()); // Middleware parse
app.use(cors()); // Middleware cors

//! These are routers from api folder

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
app.use("/admin", require("./api/admin/admin.router"));

//? Default
app.get("*", function (req, res) {
  res.redirect("/"); // Redirect to home page if not found
});

const server =app.listen(process.env.APP_PORT, () => { // Creates the server and listens on port
var os = require('os');
var networkInterfaces = os.networkInterfaces(); // Returns server data for dev
console.log(networkInterfaces);
  console.log(`Listening `, server.address());
});

