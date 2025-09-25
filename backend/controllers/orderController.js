import Order from "../models/Order.js";

// Create new order -->
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      contactNumber,
      shippingAddress,
      productName,
      quantity,
    } = req.body;

    // Validation -->
    if (!customerName || customerName.length < 3) {
      return res.status(400).json({ message: "Invalid customer name" });
    }

    const order = new Order({
      customerName,
      email,
      contactNumber,
      shippingAddress,
      productName,
      quantity,
      productImage: req.file ? `uploads/${req.file.filename}` : null,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all orders with filters for product-name and date -->
export const getOrders = async (req, res) => {
  try {
    const { productName, date } = req.query; // Get both filters
    let filter = {};

    // Filter by product-name
    if (productName) {
      filter.productName = { $regex: productName, $options: "i" };
    }
    
    // Filter by date
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      filter.createdAt = { $gte: startDate, $lte: endDate };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order -->
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update quantity -->
export const updateOrder = async (req, res) => {
  try {
    const { quantity } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};