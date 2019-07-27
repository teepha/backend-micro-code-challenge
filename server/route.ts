import express from "express";
import getInfluencer from "./controller";

const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/influencers/:id", getInfluencer);

export default router;
