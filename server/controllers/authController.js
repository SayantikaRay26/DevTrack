const jwt = require("jsonwebtoken");
const { createUser,findUserByEmail, } = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }
        const existingUser = await findUserByEmail(email);

if (existingUser.length > 0) {
    return res.status(409).json({
        message: "Email already exists."
    });
}

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await createUser(
            fullName,
            email,
            hashedPassword,
            role || "developer"
        );

        res.status(201).json({
            message: "User registered successfully!",
            userId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const users = await findUserByEmail(email);

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

       const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

res.status(200).json({
    message: "Login successful!",
    token
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
module.exports = {
    registerUser, loginUser
};