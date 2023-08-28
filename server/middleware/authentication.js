import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

const BEARER_PREFIX = "Bearer";

const verifyAccessToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        resolve(null);
      }
      resolve(decoded);
    });
  });
};

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader?.startsWith(BEARER_PREFIX)) {
      const token = authHeader.split(" ")[1];
      const decoded = await verifyAccessToken(token);

      if (decoded) {
        const user = await UserModel.findById(decoded.id).select({
          password: 0,
          refresh_token: 0,
        });

        if (user) {
          req.user = user.toObject({ getters: true });
        }
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default authentication;
