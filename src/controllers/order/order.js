import {
  Customer,
  Branch,
  DeliveryPartner,
  Order,
} from "../../models/index.js";

export const createOrder = async (req, reply) => {
  try {
    const { userId } = req.user;

    const { items, branch, totalPrice } = req.body;

    if (!items || !items.length) {
      return reply.code(400).send({ message: "Order items are required" });
    }

    const customerData = await Customer.findById(userId);

    if (!customerData) {
      return reply.code(404).send({ message: "Customer not found" });
    }

    const branchData = await Branch.findById(branch);

    if (!branchData) {
      return reply.code(404).send({ message: "Branch not found" });
    }

    const order = new Order({
      customer: userId,
      branch,
      totalPrice,
      items: items.map((item) => ({
        id: item.id,
        item: item.item,
        count: item.count,
      })),

      deliveryLocation: {
        latitude: customerData.liveLocation?.latitude,
        longitude: customerData.liveLocation?.longitude,
        address: customerData.address || "No address available",
      },

      pickupLocation: {
        latitude: branchData.location?.latitude,
        longitude: branchData.location?.longitude,
        address: branchData.address || "No address available",
      },
    });

    const savedOrder = await order.save();

    await savedOrder.populate(["items.id", "items.item"]);

    return reply.code(201).send(savedOrder);
  } catch (error) {
    return reply.code(500).send({ message: "Failed to create order", error });
  }
};

export const confirmOrder = async (req, reply) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.user;
    const { deliveryPersonLocation } = req.body;

    const deliveryPerson = await DeliveryPartner.findById(userId);

    if (!deliveryPerson) {
      return reply.code(404).send({ message: "Delivery person not found" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return reply.code(404).send({ message: "Order not found" });
    }

    if (order.status !== "available") {
      return reply.code(400).send({ message: "Order is not available" });
    }

    if (
      !deliveryPersonLocation?.latitude ||
      !deliveryPersonLocation?.longitude
    ) {
      return reply.code(400).send({ message: "Location required" });
    }

    order.status = "confirmed";

    order.deliveryPartner = userId;

    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation?.latitude,
      longitude: deliveryPersonLocation?.longitude,
      address: deliveryPersonLocation?.address || "",
    };

    await order.save();

    req.server.io.to(orderId).emit("orderConfirmed", order);

    return reply.send(order);
  } catch (error) {
    return reply.code(500).send({ message: "Failed to confirm order", error });
  }
};

export const updateOrderStatus = async (req, reply) => {
  try {
    const { orderId } = req.params;

    const { status, deliveryPersonLocation } = req.body;

    const { userId } = req.user;

    const deliveryPerson = await DeliveryPartner.findById(userId);

    if (!deliveryPerson) {
      return reply.code(404).send({ message: "Delivery partner not found" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return reply.code(404).send({ message: "Order not found" });
    }

    if (["cancelled", "delivered"].includes(order.status)) {
      return reply.code(400).send({ message: "Order cannot be updated" });
    }

    if (!order.deliveryPartner || order.deliveryPartner.toString() !== userId) {
      return reply.code(403).send({ message: "Unauthorized" });
    }

    order.status = status;

    order.deliveryPersonLocation = deliveryPersonLocation;

    await order.save();

    req.server.io.to(orderId).emit("liveTrackingUpdates", order);

    return reply.send(order);
  } catch (error) {
    return reply
      .code(500)
      .send({ message: "Failed to update order status", error });
  }
};

export const getOrders = async (req, reply) => {
  try {
    const { status, customerId, deliveryPartnerId, branchId } = req.query;

    const query = {};

    if (status) query.status = status;

    if (customerId) query.customer = customerId;

    if (deliveryPartnerId) {
      query.deliveryPartner = deliveryPartnerId;
    }

    if (branchId) {
      query.branch = branchId;
    }

    const orders = await Order.find(query).populate(
      "customer branch items.item deliveryPartner",
    );

    return reply.send(orders);
  } catch (error) {
    return reply
      .code(500)
      .send({ message: "Failed to retrieve orders", error });
  }
};

export const getOrderById = async (req, reply) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate(
      "customer branch items.item deliveryPartner",
    );

    if (!order) {
      return reply.code(404).send({ message: "Order not found" });
    }

    return reply.send(order);
  } catch (error) {
    return reply.code(500).send({ message: "Failed to retrieve order", error });
  }
};
