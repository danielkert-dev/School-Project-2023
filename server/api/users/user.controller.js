const {
  // allUsers,
  userByID,
  createUser,
  userByUsername,
  // deleteUser,
  updateUser,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  /*
    allUsers: (req, res) => {
        allUsers((error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
            return res.status(200).json({
                success: true,
                data: results
            })
        })
    },*/

  userByID: (req, res) => {
    const id = req.params.id;
    userByID(id, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      if (!results) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  userByUsername: (req, res) => {
    const username = req.params.username;
    userByUsername(username, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  authUser: (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    userByUsername(username, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

       const compare = compareSync(password, results.password);
       if (compare) {
        results.password = undefined;
        const jsontoken = sign({
          result: results,
        },
        process.env.SIGN_KEY, {
          expiresIn: "1h",
        })
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: jsontoken
        });
       } else {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
       }
    })
    
  },

  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUser(body, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },
  /*
    deleteUser: (req, res) => {
        
        const data = req.body;
        deleteUser(data, (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
            if (results.affectedRows == 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            return res.status(200).json({
                success: true,
                data: "Deleted successfully"
            })
        })
    },*/

  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },
};
