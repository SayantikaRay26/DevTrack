const db = require("../config/db");

const createUser = async (fullName, email, password, role) => {
    const query = `
        INSERT INTO users (full_name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
        fullName,
        email,
        password,
        role,
    ]);

    return result;
};
const findUserByEmail = async (email) => {
    const query = `
        SELECT * FROM users
        WHERE email = ?
    `;

    const [rows] = await db.execute(query, [email]);

    return rows;
};
module.exports = {
    createUser,
    findUserByEmail,
};