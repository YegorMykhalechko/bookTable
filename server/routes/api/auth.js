import express from "express";
import * as authContollers from "../../controllers/authController.js";

const router = express.Router();

router.post("/register", authContollers.register);
router.post("/login", authContollers.login);
router.post("/logout", authContollers.logout);
router.post("/refresh", authContollers.refresh);
router.post("/user", authContollers.user);

export { router as authRouter };
