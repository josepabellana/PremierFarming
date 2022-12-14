require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

const session = require('express-session');
const SECRET = process.env.SECRET || 'randomPassword';

const router = require('./router');

const corsConfig = {
  origin: ['http://localhost:3000','http://localhost:4200'],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, 
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(router);


const server = app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Sorry, something went wrong! ${err}`); 
  } else {
    console.log(`Server is listening on port ${SERVER_PORT}!`); 
  }
});


module.exports = server;