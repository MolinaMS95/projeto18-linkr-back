import { Router } from 'express';
import { getSomeonesPosts, setFollow } from '../controllers/posts.controllers.js';
import userIdValidation from '../middlewares/userIdValidation.middleware.js';
import { userTokenValidation } from "../middlewares/userTokenValidation.middleware.js";
import { postsSchemaValidation } from "../middlewares/postsSchemaValidation.middleware.js";
import { collectHashtags } from "../middlewares/collectHashtags.middleware.js";
import { publishPost, getPosts } from "../controllers/posts.controller.js";
import { collectMetadata } from "../middlewares/collectMetadata.middleware.js";
import userIdValidation from '../middlewares/userIdValidation.middleware.js';

const postsRouter = Router();

postsRouter.get('/user/:id', userTokenValidation, userIdValidation, getSomeonesPosts);

postsRouter.put('/setfollow/:id', userTokenValidation, userIdValidation, setFollow);

postsRouter.post(
  "/posts",
  userTokenValidation,
  postsSchemaValidation,
  collectHashtags,
  collectMetadata,
  publishPost
);
postsRouter.get("/posts",getPosts);

export default postsRouter;