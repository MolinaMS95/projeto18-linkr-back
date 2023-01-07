import { getPostsByUserid } from '../repositories/posts.repositories.js';

export async function getSomeonesPosts(req, res) {
    const {user} = req;

    delete user.email;
    delete user.password;

    try {
        const {rows} = await getPostsByUserid(user.id);

        user.posts = rows;

        res.send(user);
    } catch {
        res.sendStatus(500);
    }
}