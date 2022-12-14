const Silo = require("./../models/silo");
const Farm = require("./../models/farm");

const getSilos = async (req, res) => {
  try {
    const silos = await Silo.find()
    res.status(200).send(silos);
  } catch {
    res.status(404).send({ error, message: "An error occured trying to retrieve all silos" });
  }
  
};
const create = async (req, res) => {
  const { number,farm } = req.body;
  const silo = await Silo.findOne({ farm: farm,number:number});
  if (silo)
    return res
      .status(409)
      .send({ error: "409", message: "Silo already exists" });
  try {
    const newSilo = new Silo({
      ...req.body
    });
    const silo = await newSilo.save();
    let farmObj = await Farm.findOne({_id:farm})
    await farmObj.silos.push(silo);
    await farmObj.save();
    res.status(201).send(silo);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create silo" });
  }
};

module.exports = { getSilos, create };