import "dotenv/config";
import { Admin } from "../models/index.js";

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

export const authenticate = async (email, password) => {
  if (!email || !password) return null;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return { email, role: "Admin" };
  }

  const admin = await Admin.findOne({ email });
  if (!admin) return null;

  if (admin.password !== password) return null;

  return {
    email: admin.email,
    role: admin.role,
  };
};
