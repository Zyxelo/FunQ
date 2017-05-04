var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

import config from './config';
import express from 'express';
import queuesRoutes from './routes/queues.routes';
import bodyParser from 'body-parser';
import mongoUtils from './mongoUtils';




const server = express();





/*
// Use bodyparser to handle the parsing of JSON
server.use(bodyParser.json());


// connect to database
mongoUtils.conncectToServer(() => {
    console.log('connected to database');
});

//import the different routes example all routes concering the queue will be in the
// /queue/... route
server.use('/queues', queuesRoutes);

server.listen(config.port, () => {
    console.info('Express listening on port', config.port);
});

    */