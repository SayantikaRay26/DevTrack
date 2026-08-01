const express = require("express");
const router = express.Router();

const { fetchBugHistory } = require("../controllers/historyController");
const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/:id/history",
    verifyToken,
    fetchBugHistory
);

module.exports = router;