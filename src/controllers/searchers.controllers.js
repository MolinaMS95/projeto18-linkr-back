import initialSchema from "../models/initial.model.js";
import { getUsersByInitial } from "../repositories/searchers.repositories.js";

export async function getUsers(req, res) {
    const {params} = req;

    const validation = initialSchema.validate(params);

    if ('error' in validation) {
        const errors = validation.error.details.map(({message}) => message);

        res.status(404).send(errors);
        return;
    }

    try {
        const {rows} = await getUsersByInitial(res.locals.user.id, params.initial);

        if (rows[0].followed === null) rows[0].followed = [];
        if (rows[0].reminder === null) rows[0].reminder = [];
        
        res.send(rows[0]);
    } catch {
        res.sendStatus(500);
    }
}