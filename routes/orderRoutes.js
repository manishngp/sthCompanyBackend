const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrdersByStatus,
  moveToNextStage,
} = require("../controllers/orderController");

// 👇 CREATE ORDER
router.post("/", createOrder);

// 👇 GET ORDERS
router.get("/", getOrdersByStatus);

// 👇 MOVE NEXT
router.patch("/:id/next", moveToNextStage);

module.exports = router;

















// const express = require("express");
// const router = express.Router();

// const {
//   moveToNextStage,
//   getOrdersByStatus,
// } = require("../controllers/orderController");

// // Get all orders OR filter by status
// router.get("/", getOrdersByStatus);

// // Move order to next stage
// router.patch("/:id/next", moveToNextStage);

// module.exports = router;
