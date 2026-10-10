require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Event Management and Ticketing API is running"
  });
});

const eventRoutes = require("./routes/eventRoutes");

app.use("/api/events", eventRoutes);

const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});