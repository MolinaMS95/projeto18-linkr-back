import { connectionDB } from '../database/db.js';

export function getPostsByUserid(userid) {
    return connectionDB.query(`
        SELECT
            posts.id,
            posts.url,
            posts.content,
            l."numberOfLikes",
            JSON_AGG(hashtags) AS hashtags
        FROM posts
        FULL JOIN (
            SELECT posts.id, COUNT(likes) AS "numberOfLikes"
            FROM posts
            JOIN likes ON posts.id = likes.postid
            GROUP BY posts.id
        ) l ON posts.id = l.id
        FULL JOIN hashtag_posts ON posts.id = hashtag_posts.postid
        FULL JOIN hashtags ON hashtag_posts.hashtagid = hashtags.id
        WHERE posts.userid = $1
        GROUP BY posts.id, l."numberOfLikes";
    `, [userid]);
}

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
