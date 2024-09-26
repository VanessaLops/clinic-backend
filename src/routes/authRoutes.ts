import { Router } from "express";
import { register, login, forgotPassword, resetPassword } from "../controllers/authController";
import { getAllUsers } from "../models/userModel";

const router = Router();

//Users
router.post("/register", register);
router.get("/users", getAllUsers);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);



export default router;
