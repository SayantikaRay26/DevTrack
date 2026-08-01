const { getBugHistory } = require("../models/historyModel");
const { getBugById } = require("../models/bugModel");

// Get history of a bug
const fetchBugHistory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if bug exists
        const [bugs] = await getBugById(id);

        if (bugs.length === 0) {
            return res.status(404).json({
                message: "Bug not found."
            });
        }

        // Get history
        const [history] = await getBugHistory(id);

        res.status(200).json(history);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    fetchBugHistory
};