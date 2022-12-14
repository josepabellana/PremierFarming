const Feed = require("./../models/feed");

const getFeed = async (req, res) => {
  try {
    const feeds = await Feed.find()
    res.status(200).send(feeds);
  } catch {
    res.status(404).send({ error, message: "An error occured trying to retrieve all types of feed" });
  }
  
};
const create = async (req, res) => {
  const { name } = req.body;
  const feed = await Feed.findOne({ name: name});
  if (feed)
    return res
      .status(409)
      .send({ error: "409", message: "Feed already exists" });
  try {
    const newFeed = new Feed({
      ...req.body
    });
    const feed = await newFeed.save();
    res.status(201).send(feed);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create a new type of feed" });
  }
};

module.exports = { getFeed, create };