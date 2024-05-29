process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
});

//node event handler for uncaught sync/async errors

import config from "./config";
import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
