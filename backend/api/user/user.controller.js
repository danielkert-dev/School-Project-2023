const {
  userSearchByUsername,
  userSearchById,
  userCreate,
  userAuth,
  userUpdate,
  userDelete,
  userPointsAdd,
} = require("./user.service");
const {
  response200,
  error400,
  error404,
  error500,
  error401,
} = require("../../conf/response");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  userSearchByUsername: (req, res) => {
    const input = req.params.input;
    if (!input) {
      return error400(res);
    }
    userSearchByUsername(input, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },
  userSearchById: (req, res) => {
    const id = req.params.id;
    if (!id) {
      return error400(res);
    }
    userSearchById(id, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res);
      }
      return response200(res, results);
    });
  },

  userCreate: (req, res) => {
    const body = req.body;
    try {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    } catch (error) {
      return error500(res, error);
    }
    if (!body) {
      return error400(res);
    }
    userCreate(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  userAuth: (req, res) => {
    const body = req.body;
    if (!body.username || !body.password) {
      // Validate input
      return error400(res);
    }
    userAuth(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      const compare = compareSync(body.password, results.password);
      if (compare) {
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
        return error401(res);
      }
    });
  },

  userUpdate: (req, res) => {
    const body = req.body;
    try {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    } catch (error) {
      return error500(res, error);
    }
    if (!body) {
      return error400(res);
    }
    userUpdate(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  userDelete: (req, res) => {
    const body = req.body;
    if (!body.id) {
      return error400(res);
    }
    userDelete(body, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },

  userPointsAdd: (req, res) => {
    const input = req.body;
    if (!input) {
      return error400(res);
    }
    userPointsAdd(input, (error, results) => {
      if (error) {
        return error500(res, error);
      }
      if (!results || results.length === 0) {
        return error404(res, results);
      }
      return response200(res, results);
    });
  },
};
