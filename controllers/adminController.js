const Assignment = require("../models/assignmentModel");

const User = require("../models/userModel"); // Ensure correct path to the User model

//fetch all assignments tagged to a admin
exports.getAssignments = async (req, res) => {
    const { adminName } = req.body;

    try {
        // Find the admin's ID using their name
        const admin = await User.findOne({ name: adminName, role: "admin" }).select("_id");
        if (!admin) {
            return res.status(404).json({ error: `Admin with name "${adminName}" not found` });
        }

        // Fetch all assignments tagged to this admin
        const assignments = await Assignment.find({ admin: admin._id })
            .populate("userId", "name email") // Populate user details for better response
            .sort({ createdAt: -1 }); // Sort by newest first

        if (assignments.length === 0) {
            return res.status(200).json({ message: `No assignments found for "${adminName}"` });
        }

        res.status(200).json({ message: `Assignments for admin "${adminName}"`, assignments });
    } catch (error) {
        console.error("Error fetching assignments for admin:", error);
        res.status(500).json({ error: "Failed to fetch assignments", details: error.message });
    }
};

//update assignment status
exports.updateAssignmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // "accepted" or "rejected"
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json({ message: `Assignment ${status}`, assignment });
    } catch (error) {
        res.status(400).json({ error: "Failed to update status" });
    }
};
