import express from "express";
import {body, param} from "express-validator";
import { checkValidationResult, checkIfInfluencerExists } from "./middleware";
import getInfluencer from "./controller";

const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get(
  "/influencers/:id",
  param("id", "is Invalid!").isInt(),
  checkValidationResult,
  checkIfInfluencerExists,
  getInfluencer
);

export default router;
