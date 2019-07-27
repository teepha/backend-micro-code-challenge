import { validationResult } from "express-validator";
import influencersDb from "./mocks/influencers.json";

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
  const influencerId = req.params.id;
  const findInfluencer = influencersDb.find(
    influencer => influencer.id == influencerId
  );
  if (!findInfluencer) {
    res.status(404).send({ message: "Record not found!" });
  } else {
    req.influencerData = findInfluencer;
    next();
  }
};
