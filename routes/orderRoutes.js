const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const { purchaseTicket } = require("../controllers/orderController");

router.post("/", authenticate, purchaseTicket);

module.exports = router;