import Joi from "joi";

export const registerUserSchema = Joi.object({
  full_name: Joi.string(),
  email: Joi.string().email(),
  phone_number: Joi.string().min(10),
  password: Joi.string(),
});

export const reviewSchema = Joi.object({
  rating: Joi.number(),
  comment: Joi.string(),
  user_id: Joi.string(),
});

export const eventsSchema = Joi.object({
  destination: Joi.string(),
  description: Joi.string(),
  duration: Joi.number(),
  start_date: Joi.date(),
  price: Joi.number(),
});
