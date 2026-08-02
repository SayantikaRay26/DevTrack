const db = require("../config/db");

// Get dashboard statistics
const getDashboardStats = () => {
    const query = `
        SELECT
            COUNT(*) AS totalBugs,

            SUM(status = 'Open') AS open,

            SUM(status = 'In Progress') AS inProgress,

            SUM(status = 'Resolved') AS resolved,

            SUM(status = 'Closed') AS closed

        FROM bugs;
    `;

    return db.execute(query);
};

module.exports = {
    getDashboardStats
};