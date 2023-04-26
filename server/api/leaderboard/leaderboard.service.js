const pool = require("../../conf/db");

module.exports = {

    leaderBoardRead: (from, to, callBack) => {
        pool.query(`SELECT username, points
        FROM user
        ORDER BY points DESC
        LIMIT ?, ?`, [from, to], (error, results, fields) => {
            // Check the result of the query
            if (error) {
                return callBack(error); // Callback error
            }
            return callBack(null, results); // Callback result.
        });
    }
    

}