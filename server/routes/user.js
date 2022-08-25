const express = require("express");
const router = express.Router();

// import controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { findAll, findOne, update, Delete } = require("../controllers/user");

router.get("/user/findall", findAll);
router.get("/user/:id", findOne);
router.put("/user/:id", update);
// router.put('/admin/:id', requireSignin, adminMiddleware, update);
router.delete("/user/:id", Delete);

module.exports = router;
