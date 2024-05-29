import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protecc } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";
import { customErrorHandler } from "./handlers/error";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretLogger = (option) => (req, res, next) => {
  console.log("Secret Call");
  res.json({
    message:
      "Bonjour, You have called in a secret route. The secret is " + option,
  });
};

app.use("/secret", secretLogger("^&%$^"));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "Welcome to ChangeLogger" });
});

app.post(
  "/user/signup",
  [
    body("username").isString().isLength({ max: 40 }),
    body("password").isString().isLength({ max: 80 }),
  ],
  handleInputErrors,
  createUser
);
app.post(
  "/user/signin",
  [body("username").isString(), body("password").isString()],
  handleInputErrors,
  signIn
);

app.use("/api", protecc, router);

app.use(customErrorHandler);

export default app;
