import prisma from "../db";
import {
  comparePasswords,
  createJWTtoken,
  hashPassword,
} from "../modules/auth";

export const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.create({
      data: { username, password: await hashPassword(password) },
    });

    const token = createJWTtoken(user);
    res.json({ token });
  } catch (err) {
    err.type = "Auth";
    next(err);
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return res.status(401).json({ message: "Invalid Username" });
  }

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = createJWTtoken(user);
  res.json({ token });
};
