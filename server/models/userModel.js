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
const findUserById = async (id) => {
    const query = `
        SELECT id, full_name, email, role
        FROM users
        WHERE id = ?
    `;

    const [rows] = await db.execute(query, [id]);

    return rows;
};
module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};