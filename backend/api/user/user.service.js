const pool = require("../../conf/db.conf");

module.exports = {
  userSearch: (input, callBack) => {
    pool.query(
      "SELECT * FROM user WHERE CONCAT(username, email) LIKE ?",
      [`%${input}%`],
      (err, results) => {
        if (err) {
          console.error(err);
          callBack(err, null);
        } else {
          callBack(null, results);
        }
      }
    );
  },
  
  userSearchAll: (page, pageSize, callBack) => {
    const offset = (page - 1) * pageSize;
    pool.query("SELECT * FROM user LIMIT ? OFFSET ?", 
    [pageSize, offset], 
    (err, results) => {
      if (err) {
        console.error(err);
        callBack(err, null);
      } else {
        callBack(null, results);
      }
    });
  },

  userSearchById: (id, callBack) => {
    pool.query(
      "SELECT * FROM user WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error(err);
          callBack(err, null);
        } else {
          callBack(null, results);
        }
      }
    );
  },

  userCreate: (input, callBack) => {
    pool.query("INSERT INTO `user`(`username`, `email`, `password`) VALUES (?,?,?)", 
    [input.username, input.email, input.password], 
    (err, results) => {
      if (err) {
        console.error(err);
        callBack(err, null);
      } else {
        callBack(null, results);
      }
    });
  },

  userAuth: (input, callBack) => {
    pool.query(
      "SELECT * FROM user WHERE username = ? AND password = ?",
      [input.username, input.password],
      (err, results) => {
        if (err) {
          console.error(err);
          callBack(err, null);
        } else {
          callBack(null, results);
        }
      }
    );
  },

  userUpdate: (input, callBack) => {
    pool.query(
      "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?",
      [input.username, input.email, input.password, input.id],
      (err, results) => {
        if (err) {
          console.error(err);
          callBack(err, null);
        } else {
          callBack(null, results);
        }
      }
    );
  },

  userDelete: (input, callBack) => {
    pool.query(
      "DELETE FROM user WHERE id = ?",
      [input.id],
      (err, results) => {
        if (err) {
          console.error(err);
          callBack(err, null);
        } else {
          callBack(null, results);
        }
      }
    );
  },

  userPointsAdd: (input, callBack) => {
    pool.query(
      "UPDATE user SET points = points + 1 WHERE id = ?",
      [input],
      (err, results) => {
        if (err) {
          console.error(err);
          callBack(err, null);
        } else {
          callBack(null, results);
        }
      }
    );
  },

};
