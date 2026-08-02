const { getDashboardStats } = require("../models/dashboardModel");

// Get dashboard statistics
const fetchDashboardStats = async (req, res) => {
    try {
        const [stats] = await getDashboardStats();

        res.status(200).json(stats[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    fetchDashboardStats
};