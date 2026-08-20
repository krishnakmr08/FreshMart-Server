import { Customer, DeliveryPartner } from "../../models/index.js";

export const updateUser = async (req, reply) => {
  const { userId } = req.user;
  const { liveLocation, address } = req.body;

  try {
    const user =
      (await Customer.findById(userId)) ||
      (await DeliveryPartner.findById(userId));

    if (!user) {
      return reply.code(404).send({
        message: "User not found",
      });
    }

    user.liveLocation = liveLocation;
    user.address = address;

    await user.save();

    return reply.send({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return reply.code(500).send({
      message: "Failed to update user",
    });
  }
};
