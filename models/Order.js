const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Date & Time selected in UI
    dateTime: {
      type: Date,
    },

    // Optional field
    notes: {
      type: String,
    },

    // Required fields
    customerName: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    requirement: {
      type: String,
      required: true,
    },

    // Order workflow status
    status: {
      type: String,
      default: "NEW",
      enum: [
        "NEW",
        "QUOTE",
        "FOLLOW_UP",
        "ADVANCE",
        "PRODUCTION",
        "PAYMENT",
        "DELIVERY",
        "HISTORY",
      ],
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Order", orderSchema);
