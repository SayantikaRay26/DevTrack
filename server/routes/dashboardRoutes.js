const express = require("express");
const router = express.Router();

const { fetchDashboardStats } = require("../controllers/dashboardController");
const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/",
    verifyToken,
    fetchDashboardStats
);

module.exports = router;