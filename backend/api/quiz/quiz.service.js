const pool = require("../../conf/db.conf");

module.exports = {

    // quizAll
    quizSearchAll: (page, pageSize, callBack) => {
      const offset = (page - 1) * pageSize;
      pool.query(`
      SELECT * 
      FROM quiz 
      LIMIT ? 
      OFFSET ?`, 
      [parseInt(page), parseInt(offset)], 
      (error, results) => {
        if (error) {
          console.error(error);
          callBack(error, null);
        } else {
          callBack(null, results);
        }
      });
    },

    // quizById
    quizSearchById: (id, callBack) => {
      pool.query(
        "SELECT * FROM quiz WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            console.error(error);
            callBack(error, null);
          } else {
            callBack(null, results);
          }
        }
      );
    },

    // quizSearch
    quizSearch: (input, callBack) => {
      pool.query(
        `SELECT q.title, u.username
        FROM quiz q
        INNER JOIN user u ON q.user_ID = u.ID
        WHERE q.title LIKE ? OR u.username LIKE ?;`,
        [`%${input}%`, `%${input}%`],
        (error, results) => {
          if (error) {
            console.error(error);
            callBack(error, null);
          } else {
            callBack(null, results);
          }
        }
      );
    },

    // quizAmountAdd
    quizAmountAdd: (input, callBack) => {
      pool.query(
        "UPDATE quiz SET amount_done = amount_done + 1 WHERE id = ?",
        [input.id],
        (error, results) => {
          if (error) {
            console.error(error);
            callBack(error, null);
          } else {
            callBack(null, results);
          }
        }
      );
    },

    // questionById
    questionSearch: (quiz_id, question_num, callBack) => {
      pool.query(
        `SELECT *
        FROM questions
        WHERE quiz_ID = ? AND question_num = ?`,
        [quiz_id, question_num],
        (error, results) => {
          if (error) {
            console.error(error);
            callBack(error, null);
          } else {
            callBack(null, results);
          }
        }
      );
    },

    /* leaderboardAll */
    leaderboardSearchAll: (page, pageSize, callBack) => {
      const offset = (page - 1) * pageSize;
      pool.query(`
      SELECT username, points
      FROM user
      ORDER BY points DESC 
      LIMIT ? 
      OFFSET ?`, 
      [parseInt(page), parseInt(offset)], 
      (error, results) => {
        if (error) {
          console.error(error);
          callBack(error, null);
        } else {
          callBack(null, results);
        }
      });
    },


    // quizCreate

    // questionCreate

    // quizUpdate

    // questionUpdate

    // quizDelete

}