import "dotenv/config";
import fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { connectDB } from "./src/config/connect.js";
import { buildAdminRouter, admin } from "./src/config/admin.js";
import { registerRoutes } from "./src/routes/index.js";
import { PORT } from "./src/config/config.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const app = fastify();

    app.register(fastifySocketIO, {
      cors: { origin: "*" },
      pingInterval: 10000,
      pingTimeout: 5000,
      transports: ["websocket"],
    });

    await registerRoutes(app);

    await buildAdminRouter(app);

    app.io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(`Socket ${socket.id} joined room: ${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log(`Socket: ${socket.id} disconnected`);
      });
    });

    await app.listen({ port: PORT, host: "0.0.0.0" });

    console.log(
      `Server running on http://localhost:${PORT}${admin.options.rootPath}`,
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
