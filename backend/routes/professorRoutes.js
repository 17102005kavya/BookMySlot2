const express = require("express");
const router = express.Router();
const { authMiddleware, authorizeRole } = require("../middleware/authMiddleware");
const { addAvailability, cancelAppointment, getMyAppointments } = require("../controllers/professorController");
console.log("authMiddleware:", typeof authMiddleware);
console.log("authorizeRole:", typeof authorizeRole);
console.log("addAvailability:", typeof addAvailability);
console.log("cancelAppointment:", typeof cancelAppointment);
router.post("/availability", authMiddleware, authorizeRole("professor"), addAvailability);
router.delete("/appointment/:id", authMiddleware, authorizeRole("professor"), cancelAppointment);
router.get("/appointments", authMiddleware, authorizeRole("professor"), getMyAppointments);

module.exports = router;