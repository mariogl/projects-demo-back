import { Joi } from "express-validation";

export const createProjectSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    date: Joi.date().required(),
    student: Joi.string().required(),
    technologies: Joi.array().items(Joi.string()),
  }),
};
