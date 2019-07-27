import influencersDb from "./mocks/influencers.json";

const getInfluencer = (req, res) => {
  const influencerData = req.influencerData;
  res.status(200).send(influencerData);
};

export default getInfluencer;
