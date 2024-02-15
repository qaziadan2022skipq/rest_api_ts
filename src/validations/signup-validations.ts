import Joi from "joi";

export const authSignupValidationSchema = Joi.object().keys({
    userName: Joi.string().required().min(4).max(64),
    email: Joi.string().required().min(4).max(128),
    password: Joi.string().required().min(4).max(128),
    confirmPassword: Joi.string().required().min(4).max(128).valid(Joi.ref("password")),

})