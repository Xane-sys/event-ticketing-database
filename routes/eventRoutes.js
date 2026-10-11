const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post("/", authenticate, authorize("organizer", "admin"), createEvent);

module.exports = router;
