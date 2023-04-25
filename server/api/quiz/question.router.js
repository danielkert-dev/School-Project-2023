const {
  // allQuestions,
  // questionByID,
  questionByQuizID,
  // questionAmount,
} = require("./question.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

// router.get("/", allQuestions);
// router.get("/:id", questionByID);
router.get("/:id/:q", checkToken, questionByQuizID);
// router.get("/amount/amount/:id", questionAmount); // This is fucked. Why?

module.exports = router;
