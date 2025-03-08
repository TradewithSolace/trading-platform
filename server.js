const express = require("express");
const app = express();
const PORT = 4000;

// Basic route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
