import { Router } from 'express';
import { getSomeonesPosts } from '../controllers/posts.controllers.js';
import userIdValidation from '../middlewares/useridValidation.middleware.js';
import { userTokenValidation } from '../middlewares/userTokenValidation.middleware.js';

const postsRouter = Router();

postsRouter.get('/user/:id', userTokenValidation, userIdValidation, getSomeonesPosts);

export default postsRouter;