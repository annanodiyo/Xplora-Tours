import Joi from "joi";

export const registerUserSchema = Joi.object({
  full_name: Joi.string(),
  email: Joi.string().email(),
  phone_number: Joi.string().min(10),
  password: Joi.string(),
});
