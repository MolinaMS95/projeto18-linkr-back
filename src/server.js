import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import postsRouter from './routes/posts.routes.js';
import hashtagsRoutes from './routes/hashtags.routes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRoutes);
app.use(postsRouter);
app.use(hashtagsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));