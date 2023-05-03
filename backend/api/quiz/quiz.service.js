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
          callBack(null, results[0]);
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
        "SELECT * FROM quiz WHERE title LIKE ?",
        [`${input}`],
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
        [input],
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
    questionSearchById: (id, callBack) => {
      pool.query(
        "SELECT * FROM questions WHERE id = ?",
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
          callBack(null, results[0]);
        }
      });
    },
}