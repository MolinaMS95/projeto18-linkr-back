import joi from "joi";

export const usersSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  username: joi.string().required().min(3),
  picture: joi.string().uri().required(),
});
