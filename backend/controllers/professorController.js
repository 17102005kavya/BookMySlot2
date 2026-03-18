const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");

exports.addAvailability = async (req, res) => {
  const { slots } = req.body;

  const availability = await Availability.create({
    professor: req.user.id,
    slots: slots.map(time => ({ time }))
  });

  res.json(availability);
};

exports.cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  appointment.status = "cancelled";
  await appointment.save();

  // free slot
  await Availability.updateOne(
    {
      professor: req.user.id,
      "slots.time": appointment.time
    },
    {
      $set: { "slots.$.isBooked": false }
    }
  );

  res.json({ msg: "Cancelled" });
};
exports.getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    professor: req.user.id,
    status: "booked"
  });

  res.json(appointments);
};