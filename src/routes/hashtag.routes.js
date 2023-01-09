import { Router } from "express";
import { getHashtags, getTrendingSidebar } from "../controllers/hashtags.controller.js";
import { getHashtags } from "../repositories/hashtags.repositories.js";

const hashtagRouter = Router();

hashtagRouter.post("/hashtag/", getTrendingSidebar );
hashtagRouter.post("/hashtag/:hashtag", getHashtags );

export default hashtagRouter;