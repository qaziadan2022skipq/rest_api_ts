import { Request, Response } from "express"
import User from "../models/users";

interface RequestBody {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const updateUserController = async (req: Request<object, object, RequestBody>, res: Response) => {
    try {
        const userName = req.user;
        const {body} = req;
        const { email } = body
        // find and update
        const updatedUser = await User.findOneAndUpdate({userName}, {email},{new: true})
        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            error: JSON.stringify(error)
        })
    }
}

export default updateUserController;