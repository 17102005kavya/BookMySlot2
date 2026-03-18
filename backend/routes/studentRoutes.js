const express = require("express");
const router = express.Router();
const { authMiddleware, authorizeRole } = require("../middleware/authMiddleware");
const { getAvailableSlots, bookAppointment, getMyAppointments } = require("../controllers/studentController");
router.get("/slots/:professorId", authMiddleware, authorizeRole("student"), getAvailableSlots);
router.post("/book",authMiddleware, authorizeRole("student"), bookAppointment);
router.get("/appointments",authMiddleware, authorizeRole("student"),
 getMyAppointments);
 module.exports = router;