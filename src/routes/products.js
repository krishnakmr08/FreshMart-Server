import { getAllCategories } from "../controllers/products/category.js";
import { getProductsByCategoryId } from "../controllers/products/products.js";

export const categoryRoutes = async (fastify) => {
  fastify.get("/categories", getAllCategories);
};

export const productRoutes = async (fastify) => {
  fastify.get("/products/:categoryId", getProductsByCategoryId);
};
