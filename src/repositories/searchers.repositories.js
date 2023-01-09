import { connectionDB } from "../database/db.js";

export function getUsersByInitial(initial) {
    return connectionDB.query(`SELECT id, username, pictureurl FROM users WHERE username LIKE '${initial}%';`);
}