const pool = require("../../conf/db.conf");

module.exports = {
  // quizAll
  quizSearchAll: (page, pageSize, callBack) => {
    const offset = (page - 1) * pageSize;
    pool.query(
      `
      SELECT quiz.ID as quiz_ID, quiz.title, quiz.amount_done, quiz.description, quiz.user_ID, user.ID, user.username, quiz.image
      FROM quiz, user 
      WHERE user.ID = quiz.user_ID
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

  quizSearchByAmount : (page, pageSize, callBack) => {
    pool.query(`
    SELECT quiz.ID as quiz_ID, quiz.title, quiz.amount_done, quiz.description, quiz.user_ID, user.ID, user.username, quiz.image
      FROM quiz, user 
      WHERE user.ID = quiz.user_ID
      ORDER BY quiz.amount_done DESC 
    LIMIT ? 
    OFFSET ?;
    `, [parseInt(page), parseInt(pageSize)], (error, results) => {
      if (error) {
        console.error(error);
        callBack(error, null);
      } else {
        callBack(null, results);
      }
    });
  },

    // quizByName
    quizSearchByTitle: (title, callBack) => {
      pool.query("SELECT * FROM quiz WHERE title = ?", [title], (error, results) => {
        if (error) {
          console.error(error);
          callBack(error, null);
        } else {
          callBack(null, results);
        }
      });
    },

  // quizSearch
  quizSearch: (input, page, pageSize, callBack) => {
    const offset = (page - 1) * pageSize;
    pool.query(
      `SELECT q.ID as quiz_ID, q.title, q.description, q.image, q.amount_done, u.username
      FROM quiz q
      JOIN user u ON q.user_ID = u.ID
      WHERE q.title LIKE ? OR u.username LIKE ?
      LIMIT ? 
      OFFSET ?;
      `,
      [`%${input}%`, `%${input}%`, parseInt(page), parseInt(offset)],
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

  // questionAmountByQuizID
  questionAmountByQuizID: (quiz_id, callBack) => {
    pool.query(
      `SELECT COUNT(*) as question_amount
      FROM questions
      WHERE quiz_ID = ?`,
      [quiz_id],
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
      "INSERT INTO `quiz`(`title`,`description`, `user_ID`, `image`) VALUES (?,?,?,?)",
      [input.title, input.description, input.user_ID, input.image],
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
    pool.query(
    "INSERT INTO `questions`(`quiz_ID`, `question`, `image`, `question_num`, `description`, `choice`, `correct_answer`, `last`) VALUES (?,?,?,?,?,?,?,?)",
    [input.quiz_ID, input.question, input.image ,input.question_num, input.description, input.choice, input.correct_answer, input.last],
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

  // quizUpdate
  quizUpdate: (input, callBack) => {
    pool.query(
      "UPDATE `quiz` SET `title`= ?,`description`= ?,`image`= ? WHERE id = ?",
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

  // Add amount done

  quizAmountDone: (input, callBack) => {
    pool.query(
      "UPDATE quiz SET amount_done = ? WHERE id = ?",
      [input.amount_done, input.id],
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
      "UPDATE `questions` SET `quiz_ID`= ? ,`question`= ? ,`description`= ? ,`choice`= ?,`correct_answer`= ? WHERE ?",
      [input.quiz_ID, input.question, input.desctiption, input.choice, input.correct_answer, input.id],
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
  quizDelete: (input, callBack) => {
    pool.query (
    "DELETE FROM `quiz` WHERE id = ?",
    [input.id],
    (error, results) => {
      if (error) {
        console.error(error);
        callBack(error, null);
      } else {
        callBack(null, results);
      }
    })
  }
};
