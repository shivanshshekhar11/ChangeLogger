import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 11);
};

export const createJWTtoken = (user) => {
  const token = jwt.sign(
    { id: user.Id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protecc = (req, res, next) => {
  const bear = req.headers.authorization; //bearer, HIMYM

  if (!bear) {
    res.status(401);
    res.json({ message: "No token provided" });
    return;
  }

  try {
    const user = jwt.verify(bear, process.env.JWT_SECRET);
    req.user = user;
    //console.log(user);
    next();
  } catch (e) {
    console.log(e);
    res.status(401);
    res.json({ message: "Invalid token" });
  }
};
