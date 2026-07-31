const express = require("express");
const router = express.Router();

const {
    createNewBug,
    fetchAllBugs,
    fetchBugById,
    editBug,
     removeBug,
     assignBugToDeveloper,
     fetchAssignedBugs
} = require("../controllers/bugController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Create a new bug
router.post("/", verifyToken, createNewBug);
router.get("/", verifyToken, fetchAllBugs);

router.get(
    "/my",
    verifyToken,
    authorizeRoles("developer"),
    fetchAssignedBugs
);

router.get("/:id", verifyToken, fetchBugById);
router.put("/:id", verifyToken, editBug);
router.put(
    "/:id/assign",
    verifyToken,
    authorizeRoles("admin"),
    assignBugToDeveloper
);
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    removeBug
);
module.exports = router;