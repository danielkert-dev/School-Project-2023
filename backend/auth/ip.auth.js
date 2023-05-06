const pool = require("../conf/db.conf");
const {
  error500,
  error403,
} = require("../conf/response");

function ipInDB(callback) {
  pool.query(`SELECT * FROM validate`, (error, results) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    } else {
      return callback(null, JSON.parse(JSON.stringify(results)));
    }
  });
}

module.exports = {
  checkIp: (req, res, next) => {
    try {
      console.log("Checking IP...");
      ipInDB((error, DBip) => {
        if (error) {
          console.error("Error retrieving IP from the database:", error);
          return error500(res);
        }

        fetch("https://api.ipify.org?format=json")
          .then((response) => response.json())
          .then((data) => {
            const userIp = data.ip;
            if (userIp.includes(DBip[0].ip)) {
              next();
            } else {
              return error403(res);
            }
          })
          .catch((error) => {
            console.error("Error fetching IP:", error);
            return error500(res);
          });
      });
    } catch (error) {
      console.error("Error:", error);
      return error500(res);
    }
  },
};
