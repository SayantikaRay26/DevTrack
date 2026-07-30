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

module.exports = {
  createBug,
};