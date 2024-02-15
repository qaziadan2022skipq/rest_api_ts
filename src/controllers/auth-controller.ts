import { Request, Response } from "express"
import { authSignupValidationSchema } from "../validations/signup-validations";
import User from "../models/users";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

interface RequestBody {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const signupController = async (req: Request<object, object, RequestBody>, res: Response) => {
    try {
        const { body } = req;
        console.log(body)
        const { error } = authSignupValidationSchema.validate(body)
        if (error) {
            const message = error.details.map(e => e.message).join(", ")
            return res.status(422).json({
                error: "Validation_Error",
                message
            })
        }
        const { userName, email, password, confirmPassword } = body;
        if (!userName || !email || !password || !confirmPassword) {
            res.status(400).json({
                error: "Bad Request",
                message: "Fields can't be empty"
            })
        }
        // user already exist (check)
        const userFound = await User.findOne({ userName });
        if (userFound) {
            res.status(400).json({
                error: "Bad Request",
                message: "User already exist"
            });
        }
        // password match (check)
        if (password !== confirmPassword) {
            res.status(400).json({
                error: "Bad Request",
                message: "Passwords and Confirm Password don't match"
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        await newUser.save()
        const signedToken = await Jwt.sign({
            userName,
        },
        process.env.RESTFUL_API_AUTHORIZATION_SECRET!,
        {
            expiresIn: "8h"
        }
        )
        res.status(201).json({
            message: "User created successfully",
            userName,
            token: signedToken
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

export default signupController;