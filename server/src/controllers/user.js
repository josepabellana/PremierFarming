const bcrypt = require("bcrypt");
const User = require("./../models/user");
const Farm = require("./../models/farm");

const create = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user)
    return res
      .status(409)
      .send({ error: "409", message: "User already exists" });
  try {
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create user" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send({firstName:user.firstName,lastName:user.lastName,username:user.username});
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

const addFarm = async (req, res) => {
  const { user, farm } = req.body;
  const farmFound = await User.find({ _id: user, farms: farm });
  console.log(farmFound);
  if (farmFound.length)
    return res
      .status(409)
      .send({ error: "409", message: "Farm already exists in the user" });
  try {
    let farmObj = await Farm.findOne({_id:farm})
    let userObj = await User.findOne({ _id: user });
    await userObj.farms.push(farmObj);
    await userObj.save();
    res.status(201).send(userObj);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create farm" });
  }
};
const requestsByUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("requests").populate('farm');
  res.send(user.requests);
};

const getUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.status(201).send(users);
  } catch (err) {}
};

const getUserData = async (req, res) => {
  try {
    const {uid} = req.session;
    const user = await User.findOne({ _id:uid }).populate('requests').populate({path:'requests', populate: {path:'farm'}}).populate('farms');
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: "User not found" });
  }
};


module.exports = {
  create,
  login,
  addFarm,
  requestsByUser,
  getUserData,
  getUsers,
};
