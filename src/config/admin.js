import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";
import * as Models from "../models/index.js";
import { authenticate, COOKIE_PASSWORD } from "./config.js";

AdminJS.registerAdapter(AdminJSMongoose);

export const admin = new AdminJS({
  rootPath: "/admin",

  branding: {
    companyName: "FreshMart",
    withMadeWithLove: false,
  },

  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],

  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["phone", "role", "isActivated"],
        filterProperties: ["phone", "role"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    { resource: Models.Branch },
    { resource: Models.Product },
    { resource: Models.Category },
    { resource: Models.Order },
    { resource: Models.Counter },
  ],
});

export const buildAdminRouter = async (app) => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: COOKIE_PASSWORD,
    },
    app,
    {
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    },
  );
};
