const express = require("express");
const router = express.Router();

const {
    createNewBug,
    fetchAllBugs,
    fetchBugById,
    editBug,
     removeBug
} = require("../controllers/bugController");
const verifyToken = require("../middleware/authMiddleware");

// Create a new bug
router.post("/", verifyToken, createNewBug);
router.get("/", verifyToken, fetchAllBugs);
router.get("/:id", verifyToken, fetchBugById);
router.put("/:id", verifyToken, editBug);
router.delete("/:id", verifyToken, removeBug);
module.exports = router;