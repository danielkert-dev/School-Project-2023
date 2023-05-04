const { adminSearchAll } = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/bearer.token.auth"); // Works
const { checkIp } = require("../../auth/ip.auth");

router.get("/SearchAll/:page/:pageSize", checkToken, checkIp, adminSearchAll); // Works

module.exports = router;
