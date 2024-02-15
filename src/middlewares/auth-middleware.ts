import { NextFunction, Response, Request } from "express";
import Jwt from "jsonwebtoken"

declare module "express-serve-static-core" {
    interface Request {
      user?: string;
    }
  }

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        const token = header && header.split(" ")[1]!;
        if (!token) {
            res.status(401).json({
                error: "Unauthorized User",
                message: "Auth token is missing"
            });
        }

        const decoded = Jwt.verify(token!, process.env.RESTFUL_API_AUTHORIZATION_SECRET!)
        const { userName } = decoded as {userName: string}
        console.log(userName)
        req.user = userName
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Internal server error",
            message: JSON.stringify(error)
        })
    }
}

export default authMiddleware;