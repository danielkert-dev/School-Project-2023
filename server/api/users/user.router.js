const { allUsers,
        userByID } = require ("./user.controller"); 

const router = require("express").Router();

router.get("/", allUsers);
router.get("/:id", userByID);

module.exports = router;