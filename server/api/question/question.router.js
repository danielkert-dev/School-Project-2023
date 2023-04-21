const { allQuestions,
        questionByID,
        questionByQuizID } = require("./question.controller");
const router = require("express").Router();

router.get("/", allQuestions);
router.get("/:id", questionByID);
router.get("/quiz/:id", questionByQuizID);

module.exports = router;