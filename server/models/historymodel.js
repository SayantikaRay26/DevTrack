const db = require("../config/db");

// Add activity to history
const addHistory = (bugId, userId, action) => {
    const query = `
        INSERT INTO bug_history
        (bug_id, user_id, action)
        VALUES (?, ?, ?)
    `;

    return db.execute(query, [
        bugId,
        userId,
        action
    ]);
};
// Get bug history
const getBugHistory = (bugId) => {
    const query = `
        SELECT
            bug_history.id,
            users.full_name,
            bug_history.action,
            bug_history.created_at
        FROM bug_history
        JOIN users
            ON bug_history.user_id = users.id
        WHERE bug_history.bug_id = ?
        ORDER BY bug_history.created_at ASC
    `;

    return db.execute(query, [bugId]);
};

module.exports = {
    addHistory,
    getBugHistory
};