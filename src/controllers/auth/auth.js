import { Customer, DeliveryPartner } from "../../models/index.js";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const loginCustomer = async (req, reply) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return reply.code(400).send({ message: "Phone is required" });
    }

    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({
        phone,
        role: "Customer",
        isActivated: true,
      });

      await customer.save();
    }

    const tokens = generateTokens(customer);

    return reply.send({
      message: "Login successful",
      ...tokens,
      customer,
    });
  } catch (error) {
    return reply.code(500).send({ message: "An error occurred", error });
  }
};

export const loginDeliveryPartner = async (req, reply) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.code(400).send({ message: "Email and password required" });
    }

    const deliveryPartner = await DeliveryPartner.findOne({ email });

    if (!deliveryPartner) {
      return reply.code(404).send({ message: "Delivery partner not found" });
    }

    if (password !== deliveryPartner.password) {
      return reply.code(400).send({ message: "Invalid credentials" });
    }

    const tokens = generateTokens(deliveryPartner);

    return reply.send({
      message: "Login successful",
      ...tokens,
      deliveryPartner,
    });
  } catch (error) {
    return reply.code(500).send({ message: "An error occurred", error });
  }
};

export const refreshToken = async (req, reply) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    return reply.code(401).send({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    let user = null;

    if (decoded.role === "Customer") {
      user = await Customer.findById(decoded.userId);
    } else if (decoded.role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(decoded.userId);
    }

    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    const tokens = generateTokens(user);

    return reply.send({
      message: "Token refreshed",
      ...tokens,
    });
  } catch (error) {
    return reply.code(403).send({ message: "Invalid refresh token" });
  }
};

export const fetchUser = async (req, reply) => {
  try {
    const { userId, role } = req.user;

    let user = null;

    if (role === "Customer") {
      user = await Customer.findById(userId);
    } else if (role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(userId);
    }

    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    return reply.send({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return reply.code(500).send({ message: "An error occurred" });
  }
};
