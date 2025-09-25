import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  // Check for the authorization header and if it starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGciOiJI...")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the admin's ID to the request object for use in other routes
      // You can expand this to fetch the admin from the DB if needed
      req.admin = decoded.id; 

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};