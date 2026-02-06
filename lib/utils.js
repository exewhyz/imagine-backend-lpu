import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password, rounds = 10) => {
  return await bcrypt.hash(password, rounds);
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}


export const generateToken = (data) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set!");
  }
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME || "24h" });
};


