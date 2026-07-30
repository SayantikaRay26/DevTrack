const express = require("express");
const router = express.Router();

const { createNewBug } = require("../controllers/bugController");
const verifyToken = require("../middleware/authMiddleware");

// Create a new bug
router.post("/", verifyToken, createNewBug);

module.exports = router;