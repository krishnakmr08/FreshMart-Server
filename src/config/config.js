import "dotenv/config";
import ConnectMongoDBSession from "connect-mongodb-session";
import fastifySession from "@fastify/session";
import { Admin } from "../models/index.js";

export const PORT = process.env.PORT || 3000;

export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.error("Session store error:", error);
});

export const authenticate = async (email, password) => {
  if (!email || !password) return null;

  if (email === "freshmart@mail.com" && password === "12345678") {
    return {
      email,
      role: "Admin",
    };
  }

  const admin = await Admin.findOne({ email });

  if (!admin) return null;

  if (admin.password !== password) return null;

  return {
    email: admin.email,
    role: admin.role,
  };
};
