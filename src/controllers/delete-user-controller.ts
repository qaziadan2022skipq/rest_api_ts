import { Request, Response } from "express";
import User from "../models/users";

interface RequestBody {
    userId: string,
}

const deleteUserController = async (req: Request<object, object, RequestBody>, res: Response) => {
    try {
        const userName = req.user;
        await User.deleteOne({ userName })
        delete req.user;
        req.headers.authroization = ""
        return res.status(200).json({
            message: "User successfulyy deleted"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal server error",
            message: JSON.stringify(error)
        });
    }
}

export default deleteUserController;