const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
