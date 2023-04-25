const { allQuiz,
        quizByID } = require("./quiz.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", checkToken, allQuiz);
router.get("/:id", checkToken, quizByID);

module.exports = router;