import { connectionDB } from "../database/db.js";

export function insertHashtag(hashtag){
    return connectionDB.query(
        "INSERT INTO hashtags (name) VALUES ($1) RETURNING id;",
        [hashtag]
    );
}

export function insertHashtagPosts(hashtagid,postid){
    return connectionDB.query(
        "INSERT INTO hashtag_posts (hashtagid, postid) VALUES ($1,$2);",
        [hashtagid, postid]
    )
}

export function selectHashtagByName(name){
    return connectionDB.query(
        "SELECT * FROM hashtags WHERE name=($1);",
        [name]
    )
}

export function selectHashtags(){
    return connectionDB.query(
        "SELECT * FROM hashtags;"
    )
}

export function selectHashtagPosts(){
    return connectionDB.query(
        "SELECT * FROM hashtag_posts;"
    )
}