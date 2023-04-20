const { allChoices, choicesByID } = require("./choices.controller");

const router = require("express").Router();

router.get("/", allChoices);
router.get("/:id", choicesByID);

module.exports = router;
