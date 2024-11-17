const Assignment = require("../models/assignmentModel");
const User = require("../models/userModel"); // Ensure the correct path to your User model
//upload assignment fun for the user
exports.uploadAssignment = async (req, res) => {
    const { task, adminName } = req.body;

    try {
        // Fetch the admin's details using the adminName
        const admin = await User.findOne({ name: adminName, role: "admin" }).select("_id name");
        if (!admin) {
            //if admin doesn't exists
            return res.status(404).json({ error: `Admin with name "${adminName}" not found` });
        }
        const user = await User.findById(req.user.id).select("name");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create the assignment with the admin's name as the approver
        const assignment = await Assignment.create({
            userId: user._id,
            userName: user.name,
            task,
            admin: admin._id,
            adminName: admin.name,
        });

        res.status(201).json({ message: "Assignment uploaded", assignment });
    } catch (error) {
        console.error("Error uploading assignment:", error);
        res.status(500).json({ error: "Failed to upload assignment", details: error.message });
    }
};


//Fetch all admins for the user
exports.getAllAdmins = async (req, res) => {
    try {
        // Fetch all users with the role of 'admin'
        const admins = await User.find({ role: "admin" }).select("name");

        res.status(200).json({
            message: "Admins retrieved successfully",
            admins,
        });
    } catch (error) {
        console.error("Error while fetching admins:", error);
        res.status(500).json({
            error: "Failed to retrieve admin details",
            details: error.message,
        });
    }
};
