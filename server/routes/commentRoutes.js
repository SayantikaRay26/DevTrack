const express = require("express");
const router = express.Router();

const { createComment,fetchComments } = require("../controllers/commentController");
const verifyToken = require("../middleware/authMiddleware");

router.post(
    "/:id/comments",
    verifyToken,
    createComment
);
router.get(
    "/:id/comments",
    verifyToken,
    fetchComments
);

module.exports = router;