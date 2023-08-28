import express from "express";
import * as authContollers from "../../controllers/authController.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", authContollers.register);
router.post("/login", authContollers.login);
router.post("/logout", authContollers.logout);
router.post("/refresh", authContollers.refresh);
router.get("/user", authMiddleware, authContollers.user);

export { router as authRouter };
