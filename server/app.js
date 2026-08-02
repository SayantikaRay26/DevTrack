require("dotenv").config();
const dashboardRoutes = require("./routes/dashboardRoutes");
const historyRoutes = require("./routes/historyRoutes");
const commentRoutes = require("./routes/commentRoutes");
const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bugRoutes = require("./routes/bugRoutes");
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);
app.use("/api/bugs", commentRoutes);
app.use("/api/bugs", historyRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Welcome to DevTrack API 🚀");
});

async function startServer() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Connected to MySQL successfully!");
        connection.release();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Database connection failed:");
        console.error(err.message);
    }
}

startServer();