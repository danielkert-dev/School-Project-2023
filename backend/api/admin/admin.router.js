const { adminSearchAll,
        adminSearch,
        adminDelete, 
      } = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/bearer.token.auth"); // Works Check token

// Comments in controller but these are routers that go to app.
router.get("/SearchAll/:page/:pageSize", checkToken, adminSearchAll); // Works
router.get("/Search/:input/:page/:pageSize", checkToken, adminSearch);
router.delete("/Delete", checkToken, adminDelete); // Requires body data, Works

module.exports = router;
