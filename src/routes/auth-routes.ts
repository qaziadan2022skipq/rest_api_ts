import { Router } from "express";
import signupController from "../controllers/auth-controller";
import loginController from "../controllers/auth-login-controller"


const router = Router();

router.post('/signup', signupController) 
router.get("/login", loginController)


export default router;