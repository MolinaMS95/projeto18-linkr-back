import { connectionDB } from "../database/db.js";

export function getUsersByInitial(requesterid, initial) {
    return connectionDB.query(`
        SELECT f.followed, r.reminder
        FROM (
            SELECT 'key' AS key, JSON_AGG(u1) AS followed
            FROM (
                SELECT TRUE AS follows, users.id, users.username, users.pictureurl FROM users
            ) u1 FULL JOIN relationships ON u1.id = relationships.followedid
            WHERE u1.username LIKE '${initial}%' AND relationships.followerid = $1
        ) f FULL JOIN (
            SELECT 'key' AS key, JSON_AGG(u2) AS reminder
            FROM (
                SELECT FALSE AS follows, users.id, users.username, users.pictureurl FROM users
                ) u2 WHERE u2.id NOT IN (
                    SELECT users.id FROM users
                    FULL JOIN relationships ON users.id = relationships.followedid
                    WHERE users.username LIKE '${initial}%' AND relationships.followerid = $1
                ) AND u2.username LIKE '${initial}%'
        ) r ON f.key = r.key;
    `, [requesterid]);
}