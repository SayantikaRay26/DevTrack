const express = require("express");
const router = express.Router();

const {
    createNewBug,
    fetchAllBugs,
    fetchBugById,
    editBug,
     removeBug,
     assignBugToDeveloper,
     fetchAssignedBugs,
     changeBugStatus,
     searchBugList,
     filterBugList,
     fetchPaginatedBugs,
     sortBugList
} = require("../controllers/bugController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Create a new bug
router.post("/", verifyToken, createNewBug);
router.get("/", verifyToken, fetchAllBugs);
router.get(
    "/search",
    verifyToken,
    searchBugList
);
router.get(
    "/filter",
    verifyToken,
    filterBugList
);
router.get(
    "/page",
    verifyToken,
    fetchPaginatedBugs
);
router.get(
    "/sort",
    verifyToken,
    sortBugList
);
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
router.put(
    "/:id/status",
    verifyToken,
    authorizeRoles("developer"),
    changeBugStatus
);
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    removeBug
);
module.exports = router;