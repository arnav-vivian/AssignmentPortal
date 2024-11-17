const express = require("express");
const { uploadAssignment, getAllAdmins } = require("../controllers/userController");
const { register, login } = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authenticate, register);
router.post("/login", authenticate, login);
router.get("/getalladmins", authenticate, getAllAdmins);
router.post("/upload", authenticate, uploadAssignment);

module.exports = router;
