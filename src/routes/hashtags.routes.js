import { Router } from "express";
import { getHashtags, getTrendingSidebar } from "../controllers/hashtags.controller.js";

const hashtagsRouter = Router();

hashtagsRouter.post("/hashtag/", getTrendingSidebar );
hashtagsRouter.post("/hashtag/:hashtag", getHashtags );

export default hashtagsRouter;