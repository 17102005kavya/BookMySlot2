const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  slots: [
    {
      time: Date,
      isBooked: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model("Availability", AvailabilitySchema);