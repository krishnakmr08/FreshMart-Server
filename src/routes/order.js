import {
  confirmOrder,
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/order/order.js";

import { verifyToken } from "../middleware/auth.js";

export const orderRoutes = async (fastify) => {
  fastify.addHook("preHandler", verifyToken);

  fastify.post("/order", createOrder);
  fastify.get("/order", getOrders);
  fastify.patch("/order/:orderId/status", updateOrderStatus);
  fastify.post("/order/:orderId/confirm", confirmOrder);
  fastify.get("/order/:orderId", getOrderById);
};
