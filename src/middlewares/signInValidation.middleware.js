import bcrypt from "bcrypt";
import { getUserByEmail } from "../repositories/users.repositories";

export async function signInValidation(req, res, next) {
  const { email, password } = res.locals.user;

  try {
    const { rows } = await getUserByEmail(email);
    if (rows.length === 0) {
      return res.sendStatus(401);
    }

    const passwordOk = bcrypt.compareSync(password, rows[0].password);
    if (!passwordOk) {
      return res.sendStatus(401);
    }

    res.locals.user = rows[0];

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
