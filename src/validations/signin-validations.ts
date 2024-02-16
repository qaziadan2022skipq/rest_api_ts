import Joi from "joi";

export const signinValidationSchema = Joi.object().keys({
    email: Joi.string().required().min(4).max(128),
    password: Joi.string().required().min(4).max(128),
})