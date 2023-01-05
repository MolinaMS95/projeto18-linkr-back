import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import hashtagRoutes from "./routes/hashtag.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRoutes);
app.use(hashtagRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));