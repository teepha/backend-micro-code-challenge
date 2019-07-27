import fs from "fs";
import influencersDb from "./mocks/influencers.json";

export const getInfluencer = (req, res) => {
  const influencerData = req.influencerData;
  res.status(200).send(influencerData);
};

export const createNewInfluencer = (req, res) => {
  const {
    igFollow,
    igID,
    fbID,
    fbFollow,
    ytFollow,
    ytID,
    fullName,
    email,
    phone,
    ownPromocode,
    refPromoCode,
    refName
  } = req.body;
  const newInfluencerData = {
    id: influencersDb[influencersDb.length - 1].id + 1,
    ...req.body
  };

  const findInfluencerByEmail = influencersDb.find(
    influencer => influencer.email === email
  );

  if (findInfluencerByEmail) {
    res.status(401).json({ message: "Email already exists!" });
  } else {
    influencersDb.push(newInfluencerData);
  }

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
