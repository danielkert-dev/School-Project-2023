const { allQuestions,
        questionByID } = require("./question.controller");
const router = require("express").Router();

router.get("/", allQuestions);
router.get("/:id", questionByID);

module.exports = router;