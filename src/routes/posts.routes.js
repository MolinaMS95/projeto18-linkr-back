import { Router } from "express";
import { userTokenValidation } from "../middlewares/userTokenValidation.middleware.js";
import { postsSchemaValidation } from "../middlewares/postsSchemaValidation.middleware.js";
import { collectHashtags } from "../middlewares/collectHashtags.middleware.js";
import { publishPost, getPosts } from "../controllers/posts.controller.js";

const router = Router();

router.post("/posts",userTokenValidation, postsSchemaValidation, collectHashtags,publishPost);
router.get("/posts",getPosts);

export default router;
