import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validateFields } from "../utils/validation.js";

const register = async (req, res) => {
  const {
    username,
    email,
    first_name,
    last_name,
    password,
    password_confirms,
  } = req.body;

  try {
    // Define the required fields for registration
    const requiredFields = [
      "username",
      "email",
      "first_name",
      "last_name",
      "password",
      "password_confirms",
    ];

    // Validate that all required fields are present
    if (!validateFields(requiredFields, req.body)) {
      return res.status(422).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== password_confirms) {
      return res.status(422).json({ message: "Passwords do not match" });
    }

    // Check if a user with the given email already exists
    const userExists = await UserModel.exists({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already registered" });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    // Return success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Return error response in case of any issues
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

const login = async (req, res) => {
  res.status(200);
};
const logout = async (req, res) => {
  res.status(200);
};
const refresh = async (req, res) => {
  res.status(200);
};
const user = async (req, res) => {
  res.status(200);
};

export { register, login, logout, refresh, user };
