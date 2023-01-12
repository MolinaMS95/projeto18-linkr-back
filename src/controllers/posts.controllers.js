import { connectionDB } from '../database/db.js';
import { getPostsByUserid } from '../repositories/posts.repositories.js';

export async function getSomeonesPosts(req, res) {
    const {user} = req;

    delete user.email;
    delete user.password;

    const requesterid = res.locals.user.id;

    user.requesterid = requesterid;

    try {
        const {rows: data} = await getPostsByUserid(requesterid, user.id);

        if (data.length === 0) {
            user.isFollowing = null;
            data[0] = {posts: []};
        } else {
            if (data[0].posts[0] === null) {
                data[0].posts.pop();
            }
        }
        
        Object.assign(data[0], user);
        
        res.send(data[0]);
    } catch {
        res.sendStatus(500);
    }
}

export async function setFollow(req, res) {
    const userid = req.user.id;

    const requesterid = res.locals.user.id;

    if (requesterid === userid) {
        res.sendStatus(405);
        return;
    }

    const noInjection = [requesterid, userid];

    try {
        const {rows} = await connectionDB.query(`
            SELECT * FROM relationships
            WHERE followerid = $1 AND followedid = $2;
        `, noInjection);

        const queryInsert = 'INSERT INTO relationships (followerid, followedid) VALUES ($1, $2);';
        const queryDelete = 'DELETE FROM relationships WHERE followerid = $1 AND followedid = $2;';

        await connectionDB.query(rows.length === 0 ? queryInsert : queryDelete, noInjection);

        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}