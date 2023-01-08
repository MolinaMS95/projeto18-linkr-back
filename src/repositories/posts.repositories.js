import { connectionDB } from "../database/db.js";

export function insertPost(
  url,
  content,
  userId,
  urlTitle,
  urlDescription,
  urlImage
) {
  return connectionDB.query(
    "INSERT INTO posts (url, content, userid, urltitle, urldescription, urlimage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
    [url, content, userId, urlTitle, urlDescription, urlImage]
  );
}

export function selectPosts(){
  return connectionDB.query(
    "SELECT * from posts;"
  );
}

