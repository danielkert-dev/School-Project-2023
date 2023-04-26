const {
  // allQuestions,
  // questionByID,
  questionByQuizID,
  questionAmount,
  questionPlayed,
} = require("./question.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

// router.get("/", allQuestions);
// router.get("/:id", questionByID);
router.get("/:id/:q", checkToken, questionByQuizID);
router.get("/amount/amount/:quizID", questionAmount);
router.patch("/played/:ID", questionPlayed);
module.exports = router;
