const { adminSearchAll,
        adminDelete, 
      } = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/bearer.token.auth"); // Works
const { checkIp } = require("../../auth/ip.auth");

router.get("/SearchAll/:page/:pageSize", checkToken, checkIp, adminSearchAll); // Works
router.delete("/Delete", checkToken, checkIp, adminDelete); // Requires body data, Works

module.exports = router;
