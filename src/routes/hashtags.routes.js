import { Router } from "express";
import { getHashtags, getTrendingSidebar } from "../controllers/hashtags.controller.js";

const router = Router();

router.get("/hashtags", getTrendingSidebar);
router.get("/hashtags/:hashtag", getHashtags);

export default router;