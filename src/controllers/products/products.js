import Product from "../../models/product.js";

export const getProductsByCategoryId = async (req, reply) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    return reply.code(400).send({ message: "Category ID is required" });
  }
  try {
    const products = await Product.find({ category: categoryId }).select(
      "-category",
    );

    return reply.send(products);
  } catch (error) {
    return reply.code(500).send({ message: "An error occurred", error });
  }
};
