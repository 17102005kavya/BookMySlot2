const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");

exports.getAvailableSlots = async (req, res) => {
  const availability = await Availability.findOne({
    professor: req.params.professorId
  });

  const freeSlots = availability.slots.filter(s => !s.isBooked);
  res.json(freeSlots);
};

exports.bookAppointment = async (req, res) => {
  const { professorId, time } = req.body;

  // mark slot booked
  const result = await Availability.updateOne(
    {
      professor: professorId,
      "slots.time": time,
      "slots.isBooked": false
    },
    {
      $set: { "slots.$.isBooked": true }
    }
  );

  if (result.modifiedCount === 0) {
    return res.status(400).json({ msg: "Slot not available" });
  }

  const appointment = await Appointment.create({
    student: req.user.id,
    professor: professorId,
    time
  });

  res.json(appointment);
};

exports.getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    student: req.user.id,
    status: "booked"
  });

  res.json(appointments);
};