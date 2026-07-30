const express = require("express");
const router = express.Router();

const { registerUser,loginUser, } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Profile fetched successfully!",
        user: req.user
    });
});
module.exports = router;