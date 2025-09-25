import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  productImage: { type: String },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);