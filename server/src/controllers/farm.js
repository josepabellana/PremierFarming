const Farm = require("./../models/farm");

const getFarms = async (req, res) => {
  console.log('hi')
  try {
    const farms = await Farm.find()
    res.status(200).send(farms);
  } catch {
    res.status(404).send({ error, message: "An error occured trying to retrieve all farms" });
  }
  
};
const create = async (req, res) => {
  const { name } = req.body;
  const farm = await Farm.findOne({ name: name });
  if (farm)
    return res
      .status(409)
      .send({ error: "409", message: "Farm already exists" });
  try {
    const newFarm = new Farm({
      ...req.body
    });
    const farm = await newFarm.save();
    res.status(201).send(farm);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create farm" });
  }
};

module.exports = { getFarms, create };
