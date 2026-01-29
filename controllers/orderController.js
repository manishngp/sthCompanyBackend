const Order = require("../models/Order");

/**
 * Order status flow
 */
const STATUS_FLOW = {
  NEW: "QUOTE",
  QUOTE: "FOLLOW_UP",
  FOLLOW_UP: "ADVANCE",
  ADVANCE: "PRODUCTION",
  PRODUCTION: "PAYMENT",
  PAYMENT: "DELIVERY",
  DELIVERY: "HISTORY",
};

const VALID_STATUSES = Object.keys(STATUS_FLOW).concat("HISTORY");


exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      filter.status = status;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.moveToNextStage = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const nextStatus = STATUS_FLOW[order.status];

    if (!nextStatus) {
      return res
        .status(400)
        .json({ message: "Order already completed" });
    }

    order.status = nextStatus;
    await order.save();

    res.json({
      message: `Order moved to ${nextStatus}`,
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order({
      customerName: req.body.customerName,
      contact: req.body.contact,
      requirement: req.body.requirement,
      notes: req.body.notes,
      dateTime: req.body.dateTime,   // ✅ REQUIRED
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

