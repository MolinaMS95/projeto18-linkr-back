import { insertHashtag, insertHashtagPosts, selectHashtagByName } from "../repositories/hashtags.repositories.js";

export async function postHashtags(hashtags, postId){
    try{
        hashtags.map(async (hashtag)=>{
            const {rows} = await selectHashtagByName(hashtag);
            let hashtagId;
            if(rows.length == 0){
                hashtagId = await insertHashtag(hashtag);
            }else{
                hashtagId = rows[0].id;
            }
            console.log(hashtagId);
            console.log(postId);
            await insertHashtagPosts(hashtagId,postId);
        })
    }catch(error){
        return error;
    }
}