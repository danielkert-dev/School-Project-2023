const pool = require("../../conf/db.conf");

module.exports = {
  // quizAll
  quizSearchAll: (page, pageSize, callBack) => {
    const offset = (page - 1) * pageSize;
    pool.query(
      `
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
      }
    );
  },

  // quizById
  quizSearchById: (id, callBack) => {
    pool.query("SELECT * FROM quiz WHERE id = ?", [id], (error, results) => {
      if (error) {
        console.error(error);
        callBack(error, null);
      } else {
        callBack(null, results);
      }
    });
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
    pool.query(
      `
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
      }
    );
  },

  // quizCreate
  quizCreate: (input, callBack) => {
    pool.query(
      "INSERT INTO `quiz`(`title`,`desctiption`, `user_ID`, `image`) VALUES (?,?,?,?,?)",
      [input.title, input.desctiption, input.user_ID, input.image],
      (error, results) => {
        if (error) {
          console.error(error);
          callBack(error, null);
        } else {
          callBack(null, results);
        }
      }
    )
  },

  // questionCreate
  questionCreate: (input, callBack) => {
    "INSERT INTO `questions`(`quiz_ID`, `question`, `question_num`, `desctiption`, `choice1`, `choice2`, `choice3`, `choice4`, `correct_answer`, `last`) VALUES (?,?,?,?,?)",
    [input.quiz_ID, input.question, input.question_num, input.desctiption, input.choice1, input.choice2, input.choice3, input.choice4, input.correct_answer, input.last],
    (error, results) => {
      if (error) {
        console.error(error);
        callBack(error, null);
      } else {
        callBack(null, results);
      }
    }
  },

  // quizUpdate
  quizUpdate: (input, callBack) => {
    pool.query(
      "UPDATE `quiz` SET `title`= ?,`desctiption`= ?,`image`= ? WHERE id = ?",
      [input.title, input.desctiption, input.image, input.id],
      (error, results) => {
        if (error) {
          console.error(error);
          callBack(error, null);
        } else {
          callBack(null, results);
        }
      }
    )
  },

  // questionUpdate
  questionUpdate: (input, callBack) => {
    pool.query(
      "UPDATE `questions` SET `quiz_ID`= ? ,`question`= ? ,`desctiption`= ? ,`choice1`= ? ,`choice2`= ? ,`choice3`= ? ,`choice4`= ? ,`correct_answer`= ? WHERE ?",
      [input.quiz_ID, input.question, input.desctiption, input.choice1, input.choice2, input.choice3, input.choice4, input.correct_answer, input.question_num],
      (error, results) => {
        if (error) {
          console.error(error);
          callBack(error, null);
        } else {
          callBack(null, results);
        }
      }
    )
  },

  // quizDelete
  quizDisabled: (input, callBack) => {
    "UPDATE `quiz` SET `disabled`= 1 WHERE id = ?",
    [input.id],
    (error, results) => {
      if (error) {
        console.error(error);
        callBack(error, null);
      } else {
        callBack(null, results);
      }
    }
  }
};
