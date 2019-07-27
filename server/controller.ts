const influencersDb = require("../mocks/influencers.json");

const getInfluencer = (req, res) => {
  const influencerId = req.params.id;
  const findInfluencer = influencersDb.find(
    influencer => influencer.id == influencerId
  );
  res.status(200).send(findInfluencer);
};

export default getInfluencer;
