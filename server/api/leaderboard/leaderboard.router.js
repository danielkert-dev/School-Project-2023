const {leaderBoardRead,
} = require("./leaderboard.controller");

const router = require("express").Router();

router.get("/:from/:to", leaderBoardRead);

module.exports = router;