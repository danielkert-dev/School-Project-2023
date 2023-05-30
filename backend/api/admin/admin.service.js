const pool = require("../../conf/db.conf");
// All the comments are in the controller
module.exports = {
    
    adminSearchAll: (page, pageSize, callBack) => {
        const offset = (page - 1) * pageSize;
        pool.query(
          `
        SELECT * 
        FROM user 
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

      adminSearch: (input, page, pageSize, callBack) => {
        const offset = (page - 1) * pageSize;
        pool.query(
          `
        SELECT * 
        FROM user 
        WHERE username LIKE ? OR email LIKE ?
        LIMIT ? 
        OFFSET ?`,
          [`%${input}%`, `%${input}%` , parseInt(page), parseInt(offset)],
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

      adminDelete: (input, callBack) => {
        pool.query(
          "DELETE FROM user WHERE id = ?",
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
    
}