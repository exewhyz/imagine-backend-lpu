import { generateToken, hashPassword } from "../lib/utils.js";

const users = [
  {
    id: 1,
    email: "aniket@gmail.com",
    name: "Aniket Raj",
    password: "hashed_password_1",
  },
];

export const getUser = (req, res) => {
  try {
    const { id } = req.params;
    //TODO: fetch user from DB
    const user = users.find((u) => u.id === Number(id));
    delete user.password;
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

export const register = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid name, email and password",
      });
    }
    const existingUser = users.find((u) => u.email === email.trim())
    if(existingUser){
      return res.status(409).json({
        success: false,
        message: "User already exists",
      })
    }
    const hashedPassword = hashPassword(password.trim(), 10)

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword
    }
    users.push(newUser);

    const payload = {
      id: newUser.id,
    }

    const token = generateToken(payload);

    res.status(201).json({
      success :true,
      message : "Users registered Successfully",
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while creating user: ${error.message}`,
    });
  }
};

export const login = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error while login user: ${error.message}`,
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
