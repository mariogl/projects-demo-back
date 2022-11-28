import { Joi } from "express-validation";

export const userRegisterSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
  }),
};

export const userLoginSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
