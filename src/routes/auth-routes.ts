import { Router } from "express";
import signupController from "../controllers/auth-controller";
import updateUserController from "../controllers/update-user"
import authMiddleware from "../middlewares/auth-middleware"

const router = Router();

router.post('/signup', signupController) 
router.get('/updateUser', authMiddleware, updateUserController)
export default router;