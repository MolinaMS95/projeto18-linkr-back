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

export function getSessionById(userid) {
  return connectionDB.query("SELECT * FROM sessions WHERE userid=$1;", [
    userid,
  ]);
}

export function deleteSession(userid) {
  return connectionDB.query("DELETE FROM sessions WHERE userid=$1;", [userid]);
}

export function createSession(userid, token) {
  return connectionDB.query(
    "INSERT INTO sessions (userid, token) VALUES ($1, $2);",
    [userid, token]
  );
}

export function getSessionByToken(token) {
  return connectionDB.query("SELECT * FROM sessions WHERE token=$1;", [token]);
}

export function getUserById(id) {
  return connectionDB.query("SELECT * FROM users WHERE id=$1;", [id]);
}
