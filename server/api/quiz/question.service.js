const pool = require("../../conf/db");

module.exports = {
  /*
  allQuestions: (callBack) => {
    pool.query(`select * from questions`, [], (error, results, fields) => {
      // Check the result of the query
      if (error) {
        return callBack(error); // Callback error
      }
      return callBack(null, results); // Callback result.
    });
  },*/

  /*
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
    );
  }, */
  
  questionByQuizID: (quizID, question, callBack) => {
    pool.query(
      `select * from questions where quiz_ID = ? and question = ?`,
      [quizID, question],
      (error, results, fields) => {
        // Check the result of the query
        if (error) {
          return callBack(error); // Callback error
        }
        return callBack(null, results[0]); // Callback result.
      }
    );
  },


  questionAmount: (quizID, callBack) => {
    pool.query(
      `SELECT quiz_ID,
            count(*) AS c
        FROM questions
        Where quiz_ID = ?`,
      [quizID],
      (error, results, fields) => {
        // Check the result of the query
        if (error) {
          return callBack(error); // Callback error
        }
        return callBack(null, results[0]); // Callback result.
      }
    );
  },

  questionPlayed: (quizID, callBack) => {
    pool.query(
      `UPDATE quiz as q
        SET amount_done = amount_done + 1
        Where q.ID = ?`,
      [quizID],
      (error, results, fields) => {
        // Check the result of the query
        if (error) {
          return callBack(error); // Callback error
        }
        return callBack(null, results); // Callback result.
      }
    );
  },
};
