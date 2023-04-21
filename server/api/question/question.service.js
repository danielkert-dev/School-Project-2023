const pool = require("../../conf/db");

module.exports = {
    
    allQuestions: (callBack) => {
        pool.query(
            `select * from questions`,
            [],
            (error, results, fields) => {
                // Check the result of the query
                if (error) {
                    return callBack(error); // Callback error
                }
                return callBack(null, results); // Callback result.
            }
        )
    },

    questionByID: (id, callBack) => {
        pool.query(
            `select * from questions where ID = ?`,
            [id],
            (error, results, fields) => {
                // Check the result of the query
                if (error) {
                    return callBack(error); // Callback error
                }
                return callBack(null, results[0]); // Callback result.
            }
        )
    },

    questionByQuizID: (quizID, callBack) => {
        pool.query(
            `select * from questions where quiz_ID = ?`,
            [quizID],
            (error, results, fields) => {
                // Check the result of the query
                if (error) {
                    return callBack(error); // Callback error
                }
                return callBack(null, results[0]); // Callback result.
            }
        )
    }
}