import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import { customErrorHandler } from "./handlers/error";

const router = Router();

//Product stuff

router.get("/products", getProducts);

router.get("/product/:id", getProduct);

const validationsPOP = [body("name").isString().isLength({ max: 40 })];
router.post("/product", validationsPOP, handleInputErrors, createProduct);

const validationsPUP = [body("name").isString().isLength({ max: 40 })];
router.put("/product/:id", validationsPUP, handleInputErrors, updateProduct);

router.delete("/product/:id", deleteProduct);

//Update stuff

router.get("/updates", getUpdates);
router.get("/update/:id", getUpdate);

const validationsPOU = [
  body("title").isString(),
  body("body").isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional().isString(),
  body("media").optional().isString().isLength({ max: 10 }),
  body("productId").isString(),
];
router.post("/update", validationsPOU, handleInputErrors, createUpdate);

const validationsPUU = [
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").optional().isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional().isString().isLength({ max: 10 }),
  body("media").optional().isString(),
];
router.put("/update/:id", validationsPUU, handleInputErrors, updateUpdate);

router.delete("/update/:id", deleteUpdate);

//Update Point stuff

router.get("/updatePoints", () => {});
router.get("/updatePoint/:id", () => {});

const validationsPOUP = [
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
];
router.post("/updatePoint", validationsPOUP, handleInputErrors, () => {});

const validationsPUUP = [
  body("name").optional().isString(),
  body("description").optional().isString(),
];
router.put("/updatePoint/:id", validationsPUUP, handleInputErrors, () => {});

router.delete("/updatePoint/:id", () => {});

router.use(customErrorHandler);

export default router;
