import { Request, Response } from "express";
import { signinValidationSchema } from "../validations/signin-validations";
import User from "../models/users";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

interface RequestBody {
    email: string,
    password: string,
}

const loginController = async (req: Request<object, object, RequestBody>, res: Response) => {
    try {
        const { body } = req;
        const { error } = signinValidationSchema.validate(body)
        if (error) {
            const message = error.details.map(error => error.message).join(", ");
            return res.status(422).json({
                error: "Validation_Error",
                message
            });
        }
        const { email, password } = body;
        if (!email || !password) {
            return res.status(422).json({
                error: "Validation Error",
                message: "Required field cant be empty"
            });
        }

        // find user
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.status(404).json({
                error: "Authetication Error",
                message: "No user Exist"
            });
        }
        // password comparing
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({
                error: "Password Error",
                message: "Please enter the correct password"
            })
        }

        // sign token
        const { userName } = userFound
        const signedToken = await Jwt.sign({
            userName
        },
            process.env.RESTFUL_API_AUTHORIZATION_SECRET!,
            {
                expiresIn: "8h"
            })

            res.status(200).json({
                userName,
                token: signedToken,
            });
            
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal Server Error",
            message: JSON.stringify(error)
        })
    }
}

export default loginController;