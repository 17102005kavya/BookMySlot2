const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
app.use(express.json());

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/professor", require("./routes/professorRoutes"));
app.use("/student", require("./routes/studentRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));