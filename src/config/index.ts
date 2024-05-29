import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";
let envConfig;

if (stage === "testing") {
  envConfig = require("./test").default;
} else if (stage === "production") {
  envConfig = require("./prod").default;
} else {
  envConfig = require("./dev").default;
}

const defaultConfig = {
  stage,
  dbURL: process.env.DATABASE_URL,
  jwt: process.env.JWT_SECRET,
  port: process.env.PORT,
  logging: true,
};

export default merge(defaultConfig, envConfig);
