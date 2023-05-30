const {
    quizSearchAll,
    quizSearchById,
    quizSearchByAmount,
    quizSearch,
    quizAmountAdd,
    questionSearch,
    questionSearchResult,
    questionCheck,
    questionAmountByQuizID,
    leaderboardSearchAll,
    quizCreate,
    questionCreate,
    quizUpdate,
    quizAmountDone,
    questionUpdate,
    quizDelete,
    quizSearchByTitle,
} = require("./quiz.controller");
const { checkToken } = require("../../auth/bearer.token.auth"); // Works
const router = require("express").Router();

// Comments in controller but these are routers that go to app.
router.get("/SearchAll/:page/:pageSize", checkToken, quizSearchAll); // Works
router.get("/SearchById/:id", checkToken, quizSearchById); // Works
router.get("/SearchByAmount/:page/:pageSize", checkToken, quizSearchByAmount); // Works
router.get("/SearchByTitle/:title", checkToken, quizSearchByTitle);
router.get("/Search/:input/:page/:pageSize", checkToken, quizSearch); // Works
router.post("/AmountAdd", checkToken, quizAmountAdd); // Request body, Works
router.get("/QuestionSearch/:quiz_id/:question_num", checkToken, questionSearch); // Works
router.get("/QuestionSearchResult/:quiz_id/:question_num", checkToken, questionSearchResult);
router.get("/QuestionCheck/:quiz_id/:question_num", checkToken, questionCheck);
router.get("/QuestionAmountByQuizID/:quiz_id", checkToken, questionAmountByQuizID); // Works
router.get("/LeaderboardSearchAll/:page/:pageSize", checkToken, leaderboardSearchAll); // Works

router.post("/Create", checkToken, quizCreate); // Request body, 
router.post("/QuestionCreate", checkToken, questionCreate); // Request body,
router.put("/Update", checkToken, quizUpdate); // Request body,
router.put("/AmountDone", checkToken, quizAmountDone); // Request body,
router.put("/QuestionUpdate", checkToken, questionUpdate); // Request body, 
router.delete("/Delete", checkToken, quizDelete); // Request body, 


module.exports = router;