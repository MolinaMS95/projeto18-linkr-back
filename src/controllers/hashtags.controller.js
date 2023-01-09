import { insertHashtag, insertHashtagPosts, selectHashtagByName } from "../repositories/hashtags.repositories.js";

export async function postHashtags(hashtags, postId){
    try{
        hashtags.map(async (hashtag)=>{
            let {rows} = await selectHashtagByName(hashtag);
            let hashtagId;
            if(rows.length == 0){
                ({rows}= await insertHashtag(hashtag));
                hashtagId = rows[0].id;
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