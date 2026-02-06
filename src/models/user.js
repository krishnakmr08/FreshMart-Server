import mongoose from "mongoose";

// Base user schema
const userSchema = {
  name: { type: String },
  isActivated: { type: Boolean, default: false },
};

// Customer schema
const customerSchema = new mongoose.Schema(
  {
    ...userSchema,
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Customer"], default: "Customer" },
    liveLocation: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    address: String,
  },
  { timestamps: true },
);

// Delivery Partner schema
const deliveryPartnerSchema = new mongoose.Schema(
  {
    ...userSchema,
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["DeliveryPartner"],
      default: "DeliveryPartner",
    },
    password: { type: String, required: true },
    liveLocation: {
      latitude: Number,
      longitude: Number,
    },
    address: String,
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  },
  { timestamps: true },
);

// Admin schema
const adminSchema = new mongoose.Schema(
  {
    ...userSchema,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin"], default: "Admin" },
  },
  { timestamps: true },
);

export const Customer = mongoose.model("Customer", customerSchema);
export const DeliveryPartner = mongoose.model(
  "DeliveryPartner",
  deliveryPartnerSchema,
);
export const Admin = mongoose.model("Admin", adminSchema);
