const {
    quizSearchAll,
    quizSearchById,
    quizSearch,
    quizAmountAdd,
    questionSearchById,
    leaderboardSearchAll,
} = require("./quiz.controller");
const { checkToken } = require("../../auth/bearer.token.auth"); // Works
const router = require("express").Router();

router.get("/SearchAll/:page/:pageSize", checkToken, quizSearchAll);
router.get("/SearchById/:id", checkToken, quizSearchById);
router.get("/Search/:input", checkToken, quizSearch);
router.post("/AmountAdd", checkToken, quizAmountAdd);
router.get("/QuestionSearchById/:id", checkToken, questionSearchById);
router.get("/LeaderboardSearchAll/:page/:pageSize", checkToken, leaderboardSearchAll);

module.exports = router;