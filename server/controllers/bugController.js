const { createBug } = require("../models/bugModel");

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

module.exports = {
    createNewBug
};