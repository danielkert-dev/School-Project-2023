const pool = require("../../conf/db.conf");

module.exports = {
    
    adminSearchAll: (page, pageSize, callBack) => {
        const offset = (page - 1) * pageSize;
        console.log(pageSize);
        console.log(offset);
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