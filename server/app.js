const express = require("express");
const app = express();
const PORT = 3001;
app.get("/", (req, res) => {
    res.send("Welcome to DevTrack API 🚀");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});