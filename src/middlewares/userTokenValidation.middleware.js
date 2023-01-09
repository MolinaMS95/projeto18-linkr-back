import { getSessionByToken, getUserById } from "../repositories/users.repositories.js";

export async function userTokenValidation(req, res, next) {
  const authorization = req.headers.authorization;
  console.log("authorization")


  try {
    const { rows } = await getSessionByToken(token);
    if (rows.length === 0) {
      return res.sendStatus(401);
    }

    const user = await getUserById(rows[0].userid);
    if (user.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.locals.user = user.rows[0];

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}