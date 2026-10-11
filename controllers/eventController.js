const Event = require("../models/events");

const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, price, totalTickets } =
      req.body;

    if (
      !title ||
      !description ||
      !location ||
      !date ||
      price === undefined ||
      totalTickets === undefined
    ) {
      return res.status(400).json({
        message: "All event fields are required",
      });
    }

    const eventDate = new Date(date);

    if (Number.isNaN(eventDate.getTime())) {
      return res.status(400).json({
        message: "Invalid event date",
      });
    }

    if (eventDate <= new Date()) {
      return res.status(400).json({
        message: "Event date must be in the future",
      });
    }

    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
      return res.status(400).json({
        message: "Price must be a valid non-negative number",
      });
    }

    if (!Number.isSafeInteger(totalTickets) || totalTickets < 1) {
      return res.status(400).json({
        message: "Total tickets must be a positive integer",
      });
    }

    const event = await Event.create({
      title,
      description,
      location,
      date: eventDate,
      price,
      totalTickets,
      availableTickets: totalTickets,
      organizer: req.user._id,
    });

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create event",
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gt: new Date() },
    })
      .populate("organizer", "name")
      .sort({ date: 1 });

    return res.status(200).json({
      count: events.length,
      events,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to retrieve events",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organizer",
      "name",
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({ event });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid event ID",
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
};
