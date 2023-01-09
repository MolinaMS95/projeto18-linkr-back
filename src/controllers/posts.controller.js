import { insertPost, selectPosts } from "../repositories/posts.repositories.js";
import { postHashtags } from "./hashtags.controller.js";

export async function publishPost(req, res){
    const {url, content, userId} = res.locals.post;
    try {       
        const {rows: postId} = await insertPost(url, content, userId);
        postHashtags(res.locals.hashtags, postId[0].id);
        return res.sendStatus(201);
    } catch (error) {
       return res.status(500).send(error.message);
    }
}

export async function getPosts(req, res){
    const limit = parseInt(req.query.limit);                                                                                                                                                                                                                                                                                                                 
    try{
        let {rows: posts} = await selectPosts();
        posts = posts.reverse();
        if(limit>0){
           posts = posts.slice(0,limit);
        }
        return res.status(200).send(posts);
    }catch(error){
        return res.status(500).send(error.message);
    }
}