const db = require("../config/db");

// Add a comment
const addComment = (bugId, userId, comment) => {
    const query = `
        INSERT INTO bug_comments
        (bug_id, user_id, comment)
        VALUES (?, ?, ?)
    `;

    return db.execute(query, [
        bugId,
        userId,
        comment
    ]);
};
// Get comments for a bug
const getCommentsByBugId = (bugId) => {
    const query = `
        SELECT
            bug_comments.id,
            users.full_name,
            bug_comments.comment,
            bug_comments.created_at
        FROM bug_comments
        JOIN users
            ON bug_comments.user_id = users.id
        WHERE bug_comments.bug_id = ?
        ORDER BY bug_comments.created_at ASC
    `;

    return db.execute(query, [bugId]);
};

module.exports = {
    addComment,
    getCommentsByBugId
};