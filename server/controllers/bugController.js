const { addHistory } = require("../models/historyModel");
const { createBug, getAllBugs,getBugById,updateBug, deleteBug,assignBug,getAssignedBugs,updateBugStatus} = require("../models/bugModel");
const { findUserById } = require("../models/userModel");
// Create a new bug
const createNewBug = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        // Get logged-in user's ID from JWT
        const reportedBy = req.user.id;

        // Validation
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required."
            });
        }

        const [result] = await createBug(
            title,
            description,
            priority || "Medium",
            reportedBy
        );

        res.status(201).json({
            message: "Bug created successfully!",
            bugId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Get all bugs
const fetchAllBugs = async (req, res) => {
    try {
        const [bugs] = await getAllBugs();

        res.status(200).json({
            message: "Bugs fetched successfully!",
            total: bugs.length,
            bugs
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Get a single bug by ID
const fetchBugById = async (req, res) => {
    try {
        const { id } = req.params;

        const [bugs] = await getBugById(id);

        if (bugs.length === 0) {
            return res.status(404).json({
                message: "Bug not found."
            });
        }

        res.status(200).json({
            message: "Bug fetched successfully!",
            bug: bugs[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Update a bug
const editBug = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, status } = req.body;

        if (!title || !description || !priority || !status) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const [result] = await updateBug(
            id,
            title,
            description,
            priority,
            status
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Bug not found."
            });
        }

        res.status(200).json({
            message: "Bug updated successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Delete a bug
const removeBug = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await deleteBug(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Bug not found."
            });
        }

        res.status(200).json({
            message: "Bug deleted successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Assign bug to a developer
const assignBugToDeveloper = async (req, res) => {
    try {
        const { id } = req.params;
        const { developerId } = req.body;
        if (!developerId) {
          return res.status(400).json({
             message: "Developer ID is required."

    });
}
const [bugs] = await getBugById(id);

if (bugs.length === 0) {
    return res.status(404).json({
        message: "Bug not found."
    });
}
const users = await findUserById(developerId);

if (users.length === 0) {
    return res.status(404).json({
        message: "Developer not found."
    });
}
if (users[0].role !== "developer") {
    return res.status(400).json({
        message: "Selected user is not a developer."
    });
}
await assignBug(id, developerId);

await addHistory(
    id,
    req.user.id,
    `Assigned bug to developer ID ${developerId}`
);

res.status(200).json({
    message: "Bug assigned successfully!"
});
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Get bugs assigned to the logged-in developer
const fetchAssignedBugs = async (req, res) => {
    try {
       const developerId = req.user.id;
       const [bugs] = await getAssignedBugs(developerId);
       res.status(200).json(bugs);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Update bug status
const changeBugStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
          return res.status(400).json({
            message: "Status is required."
          });
        }
        const allowedStatuses = [
    "Open",
    "In Progress",
    "Resolved",
    "Closed"
];

if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
        message: "Invalid status."
    });
}
const [bugs] = await getBugById(id);

if (bugs.length === 0) {
    return res.status(404).json({
        message: "Bug not found."
    });
}
const bug = bugs[0];

if (bug.assigned_to !== req.user.id) {
    return res.status(403).json({
        message: "You are not assigned to this bug."
    });
}
await updateBugStatus(id, status);

await addHistory(
    id,
    req.user.id,
    `Changed status to ${status}`
);

res.status(200).json({
    message: "Bug status updated successfully!"
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = {
    createNewBug,
    fetchAllBugs,
    fetchBugById,
    editBug,
    removeBug,
    assignBugToDeveloper,
    fetchAssignedBugs,
    changeBugStatus
};