const pool = require("../../conf/db");

module.exports = {
  /*
    // User read
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
      },*/
  //? User read by id
  userByID: (id, callBack) => {
    pool.query(
      `select * from user where ID = ?`,
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
  //? User read by username
  userByUsername: (username, callBack) => {
    pool.query(
      `select password from user where username = ?`,
      [username],
      (error, results, fields) => {
        // Check the result of the query
        if (error) {
          return callBack(error); // Callback error
        }
        return callBack(null, results[0]); // Callback result.
      }
    );
  },

  authUser: (username, password, callBack) => {
    pool.query(
      `select * from user where username = ? and password = ?`,
      [username, password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  // User create
  createUser: (user, callBack) => {
    pool.query(
      `insert into user(username,email,password) values (?,?,?,?)`,
      [user.username, user.email, user.password],
      (error, results, fields) => {
        // Check the result of the query
        if (error) {
          return callBack(error); // Callback error
        }
        return callBack(null, results); // Callback result.
      }
    );
  },
  /*
    // User delete
    deleteUser: (data, callBack) => {
      pool.query(
        `delete from user where ID = ?`,
        [data.ID],
        (error, results, fields) => {
          // Check the result of the query
          if (error) {
            return callBack(error); // Callback error
          }
          if (results.affectedRows == 0) {
            return callBack("User not found"); // Callback result.
          }
          return callBack(null, results); // Callback result.
        }
      )
    },*/
  // User update
  updateUser: (data, callBack) => {
    pool.query(
      `update user set first_name = ?, last_name = ?, email = ?, password = ? where ID = ?`,
      [data.first_name, data.last_name, data.email, data.password, data.ID],
      (error, results, fields) => {
        // Check the result of the query
        if (error) {
          return callBack(error); // Callback error
        }
        if (results.affectedRows == 0) {
          return callBack("User not found"); // Callback result.
        }
        return callBack(null, results); // Callback result.
      }
    );
  },

  userPoints: (userID, questionID, callBack) => {

    pool.query(
      `
    UPDATE 
      user AS u,
      questions AS q
    SET 
      u.points = u.points + q.points_worth,
      u.done_quiz = u.done_quiz + 1 
    WHERE u.username = ? AND q.ID = ?
  `,
      [userID, questionID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  userPointsRead: (userID, callBack) => {
    pool.query(
      `select points from user where username = ?`,
      [userID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

};
