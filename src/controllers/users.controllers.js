import bcrypt from "bcrypt";
import {
  createSession,
  deleteSession,
  getSessionById,
  getUserById,
  insertUser,
} from "../repositories/users.repositories.js";
import { v4 as uuidV4 } from "uuid";

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

export async function signIn(req, res) {
  const user = res.locals.user;
  const token = uuidV4();

  try {
    const { rows } = await getSessionById(user.id);
    if (rows.length !== 0) {
      await deleteSession(user.id);
    }

    await createSession(user.id, token);

    res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function logout(req, res) {
  const user = res.locals.user;

  try {
    await deleteSession(user.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUser(req, res) {
  const user = res.locals.user;

  try {
    const { rows } = await getUserById(user.id);
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
