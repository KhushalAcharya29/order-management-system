import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await Admin.create({ email: "admin@example.com", password: hashedPassword });
  console.log("Admin created: admin@example.com / admin123");
  mongoose.disconnect();
};

seedAdmin();