import express from "express";
import { checkValidationResult, checkIfInfluencerExists } from "./middleware";
import getInfluencer from "./controller";

const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get(
  "/influencers/:id",
  checkValidationResult,
  checkIfInfluencerExists,
  getInfluencer
);

export default router;
