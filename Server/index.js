import config from './config';
import express from 'express';
import queuesRoutes from './routes/queues.routes';
import authRoutes from './routes/auth';
import userRoutes from './routes/user.routes';
import hiddenRoutes from './routes/secretPage.routes';
import bodyParser from 'body-parser';
import authCheckMiddleware from './middleware/authenticate';
import localSignupStrategy from './passport/local-signup';
import localLoginStrategy from './passport/local-login';
import mongoose from 'mongoose';
import passport from 'passport';

//const passport = require('passport');
const server = express();

// Use bodyparser to handle the parsing of JSON (for all routes)
server.use(bodyParser.json());
server.use(passport.initialize());

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Methods", "GET, PUT, OPTIONS, POST, DELETE");
  next();
});

// Set up mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri, (error) => {
  if (error) {
    console.error('Please ....');
    throw error;
  }
});

//Declare strategies to be used in passport.authenticate()
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

//middleware
server.use('/hidden', authCheckMiddleware);
server.use('/user', authCheckMiddleware);

//Middleware specified for specific routes
server.use('/queues', queuesRoutes);
server.use('/auth', authRoutes);
server.use('/user', userRoutes);
server.use('/hidden', hiddenRoutes);

server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});