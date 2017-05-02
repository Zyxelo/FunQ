import config from './config';
import express from 'express';
import queuesRoutes from './routes/queues.routes'
import bodyParser from 'body-parser';


const server = express();

// Use bodyparser to handle the parsing of JSON
server.use(bodyParser.json());



//import the different routes example all routes concering the queue will be in the
// /queue/... route
server.use('/queues', queuesRoutes);

server.listen(config.port, () => {
    console.info('Express listening on port', config.port);
});