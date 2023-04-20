const {
  allUsers,
  userByID,
  createUser,
  deleteUser,
  updateUser
} = require("./user.controller");

const router = require("express").Router();

router.get("/", allUsers);
router.get("/:id", userByID);
router.post("/", createUser);
router.delete("/", deleteUser);
router.patch("/", updateUser);

module.exports = router;
