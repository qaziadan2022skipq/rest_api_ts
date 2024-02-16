import { Router } from "express";
import authRoutes  from "./auth-routes"
import updateUserController from "../controllers/update-user"
import authMiddleware from "../middlewares/auth-middleware"

const router = Router();

router.use("/auth", authRoutes)

router.patch('/updateUser', authMiddleware, updateUserController);

export default router;

