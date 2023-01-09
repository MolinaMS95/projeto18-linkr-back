import { Router } from "express";
import { getUsers } from "../controllers/searchers.controllers.js";
import { userTokenValidation } from "../middlewares/userTokenValidation.middleware.js";

const searchRouter = Router();

searchRouter.get('/search/:initial', userTokenValidation, getUsers);

export default searchRouter;