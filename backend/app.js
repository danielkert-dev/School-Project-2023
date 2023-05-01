require("dotenv").config(); // import dotenv
const express = require('express'); // import express
const app = express(); // create express app
const cors = require('cors'); // import cors
const path = require('path'); // import path

app.use(express.json()) // Middleware parse
app.use(cors()) // Middleware cors

//? User

//? Quiz

//? Admin

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
})