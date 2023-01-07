import { connectionDB } from "../database/db.js";

export function insertPost(url, content, userId) {
  return connectionDB.query(
    "INSERT INTO posts (url, content, userid) VALUES ($1, $2, $3) RETURNING id;",
    [url, content, userId]
  );
}

export function selectPosts(){
  return connectionDB.query(
    "SELECT * from posts;"
  );
}

