const { allQuestions,
        questionByID,
        questionByQuizID } = require("./question.controller");
const router = require("express").Router();

router.get("/", allQuestions);
router.get("/:id", questionByID);
router.get("/:id/:q", questionByQuizID);

module.exports = router;