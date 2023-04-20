const pool = require("../../conf/db");

module.exports = {
    
    allChoices: (callBack) => {
        pool.query(
          `select * from choices`,
          [],
          (error, results, fields) => {
            // Check the result of the query
            if (error) {
              return callBack(error); // Callback error
            }
            return callBack(null, results); // Callback result.
          }
        );
    },

    choiceByID: (id, callBack) => {
        pool.query(
          `select * from choices where ID = ?`,
          [id],
          (error, results, fields) => {
            // Check the result of the query
            if (error) {
              return callBack(error); // Callback error
            }
            return callBack(null, results[0]); // Callback result.
          }
        );
    },

}