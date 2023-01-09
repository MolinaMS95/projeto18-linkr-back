import { postsSchema } from "../models/posts.model.js";

export async function postsSchemaValidation(req, res, next) {
  const post  = req.body;
  post.userId = res.locals.user.id;
  
  const { error } = postsSchema.validate(post, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  res.locals.post = post;

  next();
}
