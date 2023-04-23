const {
  // allUsers,
  userByID,
  createUser,
  // deleteUser,
  updateUser
} = require("./user.controller");

const router = require("express").Router();

// router.get("/", allUsers);
router.get("/:id", userByID);
router.post("/create/", createUser);
// router.delete("/", deleteUser);
router.patch("/update/", updateUser);

module.exports = router;
