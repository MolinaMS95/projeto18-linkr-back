import { connectionDB } from '../database/db.js';

export function getPostsByUserid(requesterid, userid) {
    return connectionDB.query(`
        SELECT f."boolFollowing", JSON_AGG(p) AS posts FROM (
            SELECT
                posts.*,
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
            WHERE posts.userid = $2
            GROUP BY posts.id, l."numberOfLikes"
        ) p
        FULL JOIN (
            SELECT followers.followedid, COUNT(followers) AS "boolFollowing"
            FROM followers
            WHERE followerid = $1 AND followedid = $2
            GROUP BY followers.followedid
        ) f ON p.userid = f.followedid
        GROUP BY f."boolFollowing";
    `, [requesterid, userid]);
}

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
