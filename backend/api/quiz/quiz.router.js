const {
    quizSearchAll,
    quizSearchById,
    quizSearch,
    quizAmountAdd,
    questionSearch,
    leaderboardSearchAll,
    quizCreate,
    questionCreate,
    quizUpdate,
    questionUpdate,
    quizDelete
} = require("./quiz.controller");
const { checkToken } = require("../../auth/bearer.token.auth"); // Works
const router = require("express").Router();

router.get("/SearchAll/:page/:pageSize", checkToken, quizSearchAll); // Works
router.get("/SearchById/:id", checkToken, quizSearchById); // Works
router.get("/Search/:input/:page/:pageSize", checkToken, quizSearch); // Works
router.post("/AmountAdd", checkToken, quizAmountAdd); // Request body, Works
router.get("/QuestionSearch/:quiz_id/:question_num", checkToken, questionSearch); // Works
router.get("/LeaderboardSearchAll/:page/:pageSize", checkToken, leaderboardSearchAll); // Works

router.post("/Create", checkToken, quizCreate); // Request body, 
router.post("/QuestionCreate", checkToken, questionCreate); // Request body,
router.put("/Update", checkToken, quizUpdate); // Request body,
router.put("/QuestionUpdate", checkToken, questionUpdate); // Request body, 
router.delete("/Delete", checkToken, quizDelete); // Request body, 


module.exports = router;