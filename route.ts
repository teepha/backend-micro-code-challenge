import express, { Router } from "express";
import { body, param } from "express-validator";
import {
  apiLimiter,
  createAccountLimiter,
  checkValidationResult,
} from "./middleware";
import { getInfluencer, createNewInfluencer } from "./controller";

const router: Router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get(
  "/influencers/:id",
  apiLimiter,
  param("id", "is Invalid!").isInt(),
  checkValidationResult,
  getInfluencer
);

router.post(
  "/influencers",
  createAccountLimiter,
  body([
    "igFollow",
    "igID",
    "fbID",
    "fbFollow",
    "ytFollow",
    "ytID",
    "fullName",
    "email",
    "phone",
    "ownPromocode",
    "refPromoCode",
    "refName"
  ])
    .isString()
    .withMessage("has an invalid value!")
    .trim()
    .not()
    .isEmpty()
    .withMessage("field must not be Empty!"),
  body("email", "is not a valid email!").isEmail(),
  checkValidationResult,
  createNewInfluencer
);

export default router;
