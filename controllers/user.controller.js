import { comparePassword, generateToken, hashPassword } from "../lib/utils.js";
import { User } from "../models/user.model.js";

const users = [
  {
    id: 1,
    email: "aniket@gmail.com",
    name: "Aniket Raj",
    password: "hashed_password_1",
  },
];

export const getUser = async (req, res) => {
  try {
    const id = req.userId;
    if(!id){
      return res.status(400).json({
        success : false,
        message: "Please Login again"
      })
    }
    // const user = users.find((u) => u.id === Number(id));
    // delete user.password;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: "User fetched succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error fetching user: ${error.message}`,
    });
  }
};
export const getAllUsers = (req, res) => {
  try {
    //TODO: fetch users from DB
    const updatedUsers = users.map((user) => {
      delete user.password;
      return user;
    });

    res.status(200).json({
      success: true,
      data: updatedUsers,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error fetching all users: ${error.message}`,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid name, email and password",
      });
    }
    // const existingUser = users.find((u) => u.email === email.trim());
    const existingUser = await User.findOne({ email : email?.trim() })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await hashPassword(password.trim(), 10);

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    };
    // users.push(newUser);
    await User.create(newUser)

    const payload = {
      id: newUser.id,
    };

    const token = generateToken(payload);

    res.status(201).json({
      success: true,
      message: "Users registered Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while creating user: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please Provide valid email and password",
      });
    }

    // const existingUser = users.find((u) => u.email === email.trim());
    const existingUser = await User.findOne({ email : email?.trim() })
    if(!existingUser){
      return res.status(404).json({
        success :false,
        message : "Email or Password is invalid"
      })
    }
    
    const isCorrectPassword = await comparePassword(password.trim(),existingUser.password)

    if(!isCorrectPassword){
      return res.status(404).json({
        success :false,
        message : "Email or Password is invalid"
      })
    }

    const payload = {
      id: existingUser.id
    }

    const token = generateToken(payload)

    res.status(200).json({
      success :true,
      message: "User logged in successfully",
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while login user: ${error}`,
    });
  }
};
export const updateUser = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while updating user: ${error.message}`,
    });
  }
};
export const deleteUser = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while deleting user: ${error.message}`,
    });
  }
};
