import {MongoClient} from 'mongodb';
import mongoUtils from '../mongoUtils';
var

import assert from 'assert';

let mdb = mongoUtils.getDb();





mdb.collection('queues').find({}).project({username});