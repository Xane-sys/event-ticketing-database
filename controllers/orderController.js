const Event = require("../models/events");
const Order = require("../models/orders");

const purchaseTicket = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;

    // 1. Validate the quantity
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be a positive integer"
      });
    }

    // 2. Find the event and reserve the tickets
    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        availableTickets: { $gte: quantity },
        date: { $gt: new Date() }
      },
      {
        $inc: {
          availableTickets: -quantity
        }
      },
      {
        new: true
      }
    );

    // 3. Check if tickets are available
    if (!event) {
      return res.status(400).json({
        message: "Event not found, event has passed, or insufficient tickets"
      });
    }

    // 4. Calculate the total on the server
    const totalAmount = event.price * quantity;

    // 5. Create the order
    const order = await Order.create({
      user: req.user._id,
      event: event._id,
      quantity,
      totalAmount,
      status: "pending"
    });

    // 6. Return the result
    return res.status(201).json({
      message: "Ticket reservation created successfully. Payment is pending.",
      order
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create ticket reservation"
    });
  }
};

module.exports = { purchaseTicket };