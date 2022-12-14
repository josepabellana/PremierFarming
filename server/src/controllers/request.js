const Request = require('../models/request');
const User = require('../models/user');

const create = async (req, res) => {
    const {user} = req.body;
    try {
        const newRequest = new Request({
          ...req.body
        });
        const request = await newRequest.save();
        let userObj = await User.findOne({_id:user})
        await userObj.requests.push(request);
        await userObj.save();
        console.log('request created', request)
        res.status(201).send(request);
      } catch (error) {
        res.status(400).send({ error, message: "Could not create request" });
      } 
    }
const getRequests =async(req,res)=>{
    try {
        const requests = await Request.find()
        res.status(200).send(requests);
      } catch {
        res.status(404).send({ error, message: "An error occurred trying to retrieve all requests" });
      }
}
const modifyRequest =async(req,res)=>{
  const {id,status} = req.body;
  try {

      const request = await Request.findOne({_id:id});
      request.status = status;
      await request.save();
      res.status(200).send(request);
    } catch(error) {
      res.status(404).send({ error, message: "An error occurred trying to modify the request" });
    }
}



module.exports = { create , getRequests, modifyRequest };
