import { Router } from 'express';
import { getSomeonesPosts } from '../controllers/posts.controllers.js';
import userIdValidation from '../middlewares/useridValidation.middleware.js';
import { userTokenValidation } from "../middlewares/userTokenValidation.middleware.js";
import { postsSchemaValidation } from "../middlewares/postsSchemaValidation.middleware.js";
import { collectHashtags } from "../middlewares/collectHashtags.middleware.js";
import { publishPost, getPosts } from "../controllers/posts.controller.js";
import { collectMetadata } from "../middlewares/collectMetadata.middleware.js";

const postsRouter = Router();

postsRouter.get('/user/:id', userIdValidation, getSomeonesPosts);

router.post(
  "/posts",
  userTokenValidation,
  postsSchemaValidation,
  collectHashtags,
  collectMetadata,
  publishPost
);
router.get("/posts",getPosts);

export default postsRouter;