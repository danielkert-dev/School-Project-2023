const {
  // allQuestions,
  // questionByID,
  questionByQuizID,
  // questionAmount,
} = require("./question.controller");
const router = require("express").Router();

// router.get("/", allQuestions);
// router.get("/:id", questionByID);
router.get("/:id/:q", questionByQuizID);
// router.get("/amount/amount/:id", questionAmount); // This is fucked. Why?

module.exports = router;
