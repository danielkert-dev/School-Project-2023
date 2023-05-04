const {
  userSearch,
  userSearchById,
  userCreate,
  userAuth,
  userUpdate,
  userDelete,
  userPointsAdd,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  userSearch: (req, res) => {
    const input = req.params.input;
    if (!input) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    userSearch(input, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  userSearchById: (req, res) => {
    const id = req.params.id;
    if (!id) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    userSearchById(id, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  userCreate: (req, res) => {
    const body = req.body;
    try {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    if (!body) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    userCreate(body, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  userAuth: (req, res) => {
    const body = req.body;
    if (!body.username || !body.password) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    userAuth(body, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const compare = compareSync(body.password, results.password);
      if (compare) {
        // Compare passwords
        results.password = undefined;
        const token = sign(
          {
            results: results,
          },
          process.env.SIGN_KEY,
          {
            expiresIn: "1h",
          }
        );
        // Return results
        return res.status(200).json({
          // Return results
          success: true,
          message: "Login successful",
          token: token,
        });
      } else {
        return res.status(401).json({
          // Return results
          success: false,
          message: "Invalid password",
        });
      }
    });
  },

  userUpdate: (req, res) => {
    const body = req.body;
    try {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    if (!body) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    userUpdate(body, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        data: results,
      });
    });
  },

  userDelete: (req, res) => {
    const body = req.body;
    if (!body.id) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    userDelete(body, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (results.affectedRows === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        // Return results
        success: true,
        message: "Deleted successfully",
      });
    });
  },

  userPointsAdd: (req, res) => {
    const input = req.body;
    if (!input) {
      // Validate input
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }
    userPointsAdd(input, (error, results) => {
      if (error) {
        // Error handling
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (!results || results.length === 0) {
        // Missing results
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Points added successfully",
      });
    });
  },
};
