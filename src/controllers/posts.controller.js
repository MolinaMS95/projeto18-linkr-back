import { insertPost, selectPosts } from "../repositories/posts.repositories.js";
import { postHashtags } from "./hashtags.controller.js";
import { getUserById } from "../repositories/users.repositories.js";

export async function publishPost(req, res) {
  const { url, content, userId, urlTitle, urlDescription, urlImage } =
    res.locals.post;
  try {
    const { rows: postId } = await insertPost(
      url,
      content,
      userId,
      urlTitle,
      urlDescription,
      urlImage
    );
    postHashtags(res.locals.hashtags, postId[0].id);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getPosts(req, res) {
  const limit = parseInt(req.query.limit);
  try {
    let { rows: postsRows } = await selectPosts(res.locals.user.id);
    postsRows = postsRows.reverse();
    if (limit > 0) {
      postsRows = postsRows.slice(0, limit);
    }
    for (let i = 0; i < postsRows.length; i++) {
      const { rows: userRows } = await getUserById(postsRows[i].userid);
      postsRows[i].userimage = userRows[0].pictureurl;
      postsRows[i].username = userRows[0].username;
    }
    return res.status(200).send(postsRows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}