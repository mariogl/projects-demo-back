import { Joi } from "express-validation";

export const userDataSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  }),
};
