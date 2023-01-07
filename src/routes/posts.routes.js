import { Router } from 'express';
import { getSomeonesPosts } from '../controllers/posts.controllers.js';
import userIdValidation from '../middlewares/useridValidation.middleware.js';

const postsRouter = Router();

postsRouter.get('/user/:id', userIdValidation, getSomeonesPosts);

export default postsRouter;