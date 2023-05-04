const {
  userSearch,
  userSearchById,
  userCreate,
  userAuth,
  userUpdate,
  userDelete,
  userPointsAdd,
} = require("./user.controller");
const { checkToken } = require("../../auth/bearer.token.auth"); // Works
const router = require("express").Router();

router.get("/Search/:input", checkToken, userSearch); // Works
router.get("/SearchById/:id", checkToken, userSearchById); // Works
router.post("/Create", checkToken, userCreate); // Request body, Works
router.post("/Auth", userAuth); // Request body, Works
router.put("/Update", checkToken, userUpdate); // Request body, Works
router.delete("/Delete", checkToken, userDelete); // Request body, Works
router.post("/PointsAdd", checkToken, userPointsAdd); // Works

module.exports = router;
