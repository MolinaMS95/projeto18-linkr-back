import idSchema from '../models/id.model.js';
import { getUserById } from '../repositories/users.repositories.js';

export default async function userIdValidation(req, res, next) {
    const {id} = req.params;

    const validation = idSchema.validate(id);

    if ('error' in validation) {
        const errors = validation.error.details.map(({message}) => message);

        res.status(404).send(errors);
        return;
    }

    try {
        const {rows} = await getUserById(id);

        if (rows.length === 0) {
            res.sendStatus(404);
            return;
        }

        req.user = rows[0];
    } catch {
        res.sendStatus(500);
        return;
    }

    next();
}