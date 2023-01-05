import bcrypt from "bcrypt";
import { insertUser } from "../repositories/users.repositories.js";

export async function signUp(req, res) {
  const { username, email, picture, password } = res.locals.user;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    await insertUser(username, email, picture, hashPassword);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
