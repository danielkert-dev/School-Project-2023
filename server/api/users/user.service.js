const pool = require("../../conf/db");

module.exports = {
    allUsers: (callBack) => {
        pool.query(
          `select ID,first_name,last_name,email,last_login,done_quiz from user`,
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

    userByID: (id, callBack) => {
        pool.query(
          `select ID,first_name,last_name,email,last_login,done_quiz from user where ID = ?`,
          [id],
          (error, results, fields) => {
            // Check the result of the query
            if (error) {
              return callBack(error); // Callback error
            }
            return callBack(null, results[0]); // Callback result.
          }
        );
    }
    
}