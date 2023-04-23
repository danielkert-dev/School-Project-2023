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
    //? User read by email
    // User create
    createUser: (user, callBack) => {
        pool.query(
          `insert into user(first_name,last_name,email,password) values (?,?,?,?)`,
          [user.first_name,user.last_name,user.email,user.password],
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
        [data.first_name,data.last_name,data.email,data.password,data.ID],
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
    }

}