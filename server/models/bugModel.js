const db = require("../config/db");

// Create a new bug
const createBug = (
  title,
  description,
  priority,
  reportedBy
) => {

  const query = `
    INSERT INTO bugs
    (title, description, priority, reported_by)
    VALUES (?, ?, ?, ?)
  `;

  return db.execute(query, [
    title,
    description,
    priority,
    reportedBy,
  ]);
};
    // Get all bugs
const getAllBugs = () => {
    const query = `
        SELECT
            id,
            title,
            description,
            priority,
            status,
            reported_by,
            assigned_to,
            created_at,
            updated_at
        FROM bugs
        ORDER BY created_at DESC
    `;

    return db.execute(query);
};
// Get bug by ID
const getBugById = (id) => {
    const query = `
        SELECT
            id,
            title,
            description,
            priority,
            status,
            reported_by,
            assigned_to,
            created_at,
            updated_at
        FROM bugs
        WHERE id = ?
    `;

    return db.execute(query, [id]);
};
// Update bug
const updateBug = (id, title, description, priority, status) => {
    const query = `
        UPDATE bugs
        SET
            title = ?,
            description = ?,
            priority = ?,
            status = ?
        WHERE id = ?
    `;

    return db.execute(query, [
        title,
        description,
        priority,
        status,
        id
    ]);
};
// Delete bug
const deleteBug = (id) => {
    const query = `
        DELETE FROM bugs
        WHERE id = ?
    `;

    return db.execute(query, [id]);
};
// Assign bug to developer
const assignBug = (bugId, developerId) => {
    const query = `
        UPDATE bugs
        SET assigned_to = ?
        WHERE id = ?
    `;

    return db.execute(query, [developerId, bugId]);
};
// Get bugs assigned to a developer
const getAssignedBugs = (developerId) => {
    const query = `
        SELECT
            id,
            title,
            description,
            priority,
            status,
            reported_by,
            assigned_to,
            created_at,
            updated_at
        FROM bugs
        WHERE assigned_to = ?
        ORDER BY created_at DESC
    `;

    return db.execute(query, [developerId]);
};
module.exports = {
  createBug,
  getAllBugs,
  getBugById,
  updateBug,
  deleteBug,
  assignBug,
  getAssignedBugs
};