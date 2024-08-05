// const Admin = require("../models/Admin");
// const jwt = require("jsonwebtoken");

// // Middleware to verify token and check admin role
// exports.verifyAdmin = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return res.status(401).json({ message: "Admin not found" });
//     }

//     req.admin = admin;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); 

// Middleware to verify token and check admin role
exports.verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the admin by ID
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Check if the user has the admin role
    if (!admin.isAdmin) {
      return res.status(403).json({ message: "Access forbidden: Admin role required" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

