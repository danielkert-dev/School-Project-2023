const { allQuiz,
        quizByID } = require("./quiz.controller");
const router = require("express").Router();

router.get("/", allQuiz);
router.get("/:id", quizByID);

module.exports = router;