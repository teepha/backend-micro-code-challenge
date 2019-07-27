import { validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import influencersDb from "./mocks/influencers.json";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Too many requests created from this IP, please try again after 15 minutes"
});

export const createAccountLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 3,
  message:
    "Too many accounts created from this IP, please try again after 30 minutes"
});

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
      res
        .status(422)
        .json({ message: `${error.param.toUpperCase()} ${error.msg}` });
    });
  } else {
    next();
  }
};

export const checkIfInfluencerExists = (req, res, next) => {
  const influencerId = parseInt(req.params.id, 10);
  const findInfluencer = influencersDb.find(
    influencer => influencer.id === influencerId
  );
  if (!findInfluencer) {
    res.status(404).send({ message: "Record not found!" });
  } else {
    req.influencerData = findInfluencer;
    next();
  }
};
