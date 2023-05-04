const {
    quizSearchAll,
    quizSearchById,
    quizSearch,
    quizAmountAdd,
    questionSearch,
    leaderboardSearchAll,
} = require("./quiz.controller");
const { checkToken } = require("../../auth/bearer.token.auth"); // Works
const router = require("express").Router();

router.get("/SearchAll/:page/:pageSize", checkToken, quizSearchAll); // Works
router.get("/SearchById/:id", checkToken, quizSearchById); // Works
router.get("/Search/:input", checkToken, quizSearch); // Works
router.post("/AmountAdd", checkToken, quizAmountAdd); // Request body, Works
router.get("/QuestionSearch/:quiz_id/:question_num", checkToken, questionSearch); // Works
router.get("/LeaderboardSearchAll/:page/:pageSize", checkToken, leaderboardSearchAll); // Works

module.exports = router;