const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");

//Register fun 

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    //Generate a unique userId using email hash
    const userId = crypto.createHash('sha256').update(email).digest('hex');

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role, userId });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).json({ error: "Registration failed", details: error.message });
    }
};

//login fun 
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: "Login failed" });
    }
};
