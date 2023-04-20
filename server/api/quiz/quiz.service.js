const pool = require("../../conf/db");

module.exports = {
    
    allQuiz: (callBack) => {
        pool.query(
            `select * from quiz`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    quizByID: (id, callBack) => {
        pool.query(
            `select * from quiz where ID = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]); // Callback result.
            }
        )
    }


}