import { Router } from "express";
import authRoutes  from "./auth-routes"
import updateUserController from "../controllers/update-user"
import authMiddleware from "../middlewares/auth-middleware"
import deleteUserController from "../controllers/delete-user-controller";


const router = Router();

router.use("/auth", authRoutes)

router.patch('/update-user', authMiddleware, updateUserController);
router.delete("/delete-user", authMiddleware, deleteUserController);


export default router;

