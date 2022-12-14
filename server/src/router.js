const router = require('express').Router();
const userController = require('./controllers/user');
const farmController = require('./controllers/farm');
const siloController = require('./controllers/silo');
const requestController = require('./controllers/request');
const feedController = require('./controllers/feed')
const authMiddleware = require('./middlewares/auth');


//post
router.post('/createUser', userController.create);
router.post('/createFarm',farmController.create);
router.post('/createSilo',siloController.create);
router.post('/createRequest',requestController.create);
router.post('/createFeed',feedController.create)

//user login
router.post('/login', userController.login);

//put
router.put('/addFarmToUser',userController.addFarm);
router.put('/modifyRequest',requestController.modifyRequest)

//get
router.get('/getRequests',requestController.getRequests);
router.get('/getFarms', farmController.getFarms);
router.get('/getSilos',siloController.getSilos);
router.get('/getUsers',userController.getUsers);
router.get('/getFeed',feedController.getFeed)
router.get('/getUserData',authMiddleware,userController.getUserData);





router.get('*', (req, res) => {
    res.status(404).send('Route not found');
  });

module.exports = router;