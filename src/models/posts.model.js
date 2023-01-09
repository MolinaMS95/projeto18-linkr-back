import joi from "joi";

export const postsSchema = joi.object({
  url: joi.string().uri().required(),
  content: joi.string(),
  userId: joi.number().required()
});
