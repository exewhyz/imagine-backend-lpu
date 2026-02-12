import { User } from "../models/user.model.js";

export const verifyRole = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login again",
      });
    }
    const user = await User.findById(userId).select("role");

    if(!user || user.role !== "admin"){
        return res.status(403).json({
            success: false,
            message: "You don't have permission to perform this action"
        })
    }
    next();
  } catch (error) {
    res.status(500).json({
        success :false,
        message : `Error while verifying role: ${error.message}`
    })
  }
};
