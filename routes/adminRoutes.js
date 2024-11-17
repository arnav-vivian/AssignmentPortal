const express = require("express");
const { getAssignments, updateAssignmentStatus } = require("../controllers/adminController");
const authenticate = require("../middlewares/authMiddleware");
const { register, login } = require("../controllers/authController");

const router = express.Router();
router.post("/register", authenticate, register);
router.post("/login", authenticate, login);
router.get("/assignments", authenticate, getAssignments);
router.post("/assignments/:id/:status", authenticate, updateAssignmentStatus);

module.exports = router;
