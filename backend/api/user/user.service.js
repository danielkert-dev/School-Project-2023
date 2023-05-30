const pool = require("../../conf/db.conf");
// All the comments are in the controller
module.exports = {
  userSearchByUsername: (input, callBack) => {
    pool.query(
      "SELECT * FROM user WHERE username LIKE ?",
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

  userSearchById: (id, callBack) => {
    pool.query("SELECT * FROM user WHERE id = ?", [id], (error, results) => {
      if (error) {
        console.error(error);
        callBack(error, null);
      } else {
        callBack(null, results);
      }
    });
  },

  userCreate: (input, callBack) => {
    pool.query(
      "INSERT INTO `user`(`username`, `email`, `password`) VALUES (?,?,?)",
      [input.username, input.email, input.password],
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

  userAuth: (input, callBack) => {
    pool.query(
      "SELECT password FROM user WHERE username = ?",
      [input.username],
      (error, results) => {
        if (error) {
          console.error(error);
          callBack(error, null);
        } else {
          callBack(null, results[0]);
        }
      }
    );
  },

  userUpdate: (input, callBack) => {
    pool.query(
      "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?",
      [input.username, input.email, input.password, input.id],
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

  userDelete: (input, callBack) => {
    pool.query(
      `UPDATE user 
      SET disabled = 1, 
        password = rand(),
          username = CONCAT('Anon.', FLOOR(RAND() * 1000000)), 
          email = 'Anonymous'
      WHERE id = ?;
      `,
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

  userPointsAdd: (input, callBack) => {
    pool.query(
      "UPDATE user SET points = points + 1 WHERE id = ?",
      [parseInt(input.id)],
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

};
