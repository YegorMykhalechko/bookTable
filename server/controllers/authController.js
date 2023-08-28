import { UserModel } from "../models/User.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validateFields } from "../utils/validation.js";
import { clearRefreshCookie } from "../utils/clearCookie.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

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
  const { email, password } = req.body;

  try {
    // Define the required fields for registration
    const requiredFields = ["email", "password"];

    // Validate that all required fields are present
    if (!validateFields(requiredFields, req.body)) {
      return res.status(422).json({ message: "All fields are required" });
    }

    // Check if a user with the given email exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate access token
    const accessToken = generateAccessToken(user.id);

    // Generate refresh token
    const refreshToken = generateRefreshToken(user.id);

    // Update user's refresh token
    user.refresh_token = refreshToken;
    await user.save();

    // Set refresh token as a cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    // Respond with the access token
    res.json({ access_token: accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refresh_token) {
    // If the refresh_token cookie is missing, the user is already logged out
    return res.sendStatus(204);
  }

  try {
    const user = await UserModel.findOne({
      refresh_token: cookies.refresh_token,
    });

    if (!user) {
      // If no user found with the provided refresh_token, clear the cookie and return 204
      clearRefreshCookie(res);
      return res.sendStatus(204);
    }

    // Clear the user's refresh_token, save the changes, and clear the cookie
    user.refresh_token = null;
    await user.save();
    clearRefreshCookie(res);
    return res.sendStatus(204);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refresh_token) {
    return res.sendStatus(401); // No refresh_token cookie, Unauthorized
  }

  const refreshToken = cookies.refresh_token;

  try {
    const user = await UserModel.findOne({ refresh_token: refreshToken });

    if (!user) {
      return res.sendStatus(403); // User not found, Forbidden
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (user.id !== decoded.id) {
      return res.sendStatus(403); // Mismatched user IDs, Forbidden
    }

    // Generate a new access token using the user's ID
    const accessToken = generateAccessToken(user.id);

    // Respond with the new access token
    res.json({ access_token: accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

const user = async (req, res) => {
  try {
    // Get the user object from the request
    const user = req.user;

    // Check if a user object exists in the request
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user object
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export { register, login, logout, refresh, user };
