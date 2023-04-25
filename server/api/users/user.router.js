const {
  // allUsers,
  userByID,
  createUser,
  userByUsername,
  authUser,
  // deleteUser,
  updateUser,
  userPoints,
  userPointsRead
} = require("./user.controller");

const { checkToken } = require("../../auth/token_validation");

const router = require("express").Router();

// router.get("/", allUsers);
router.get("/:id", checkToken, userByID);
router.get("/username/:username", userByUsername);
router.get("/auth/:username/:password", authUser);
router.post("/create/", createUser);
// router.delete("/", deleteUser);
router.patch("/update/", updateUser);
router.patch("/points/:userID/:questionID", userPoints);
router.get("/points/:userID/", userPointsRead);

module.exports = router;
