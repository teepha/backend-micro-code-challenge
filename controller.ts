import { Request, Response } from "express";
import fs from "fs";
import influencersDb from "./mocks/influencers.json";

export const getInfluencer = (req: Request, res: Response) => {
  const influencerId: number = parseInt(req.params.id, 10);
  const findInfluencer = influencersDb.find(
    influencer => influencer.id === influencerId
  );
  if (!findInfluencer) {
    res.status(404).send({ message: "Record not found!" });
  } else {
    res.status(200).send(findInfluencer);
  }
};

export const createNewInfluencer = (req: Request, res: Response) => {
  const { email } = req.body;
  const newInfluencerData = {
    id: influencersDb[influencersDb.length - 1].id + 1,
    ...req.body
  };

  const findInfluencerByEmail = influencersDb.find(
    influencer => influencer.email === email
  );

  if (findInfluencerByEmail) {
    return res.status(401).json({ message: "Email already exists!" });
  }
  influencersDb.push(newInfluencerData);

  fs.writeFile(
    "mocks/influencers.json",
    JSON.stringify(influencersDb, null, 2),
    error => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send(newInfluencerData);
      }
    }
  );
};
