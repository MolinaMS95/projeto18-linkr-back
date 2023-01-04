import { connectionDB } from "../database/db.js";

export function getUserByEmail(email) {
  return connectionDB.query("SELECT * FROM users WHERE email=$1;", [email]);
}

export function insertUser(username, email, picture, hashPassword) {
  return connectionDB.query(
    "INSERT INTO users (username, email, pictureurl, password) VALUES ($1, $2, $3, $4);",
    [username, email, picture, hashPassword]
  );
}
