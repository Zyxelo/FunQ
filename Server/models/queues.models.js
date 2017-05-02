import {MongoClient} from 'mongodb';
import config from '../config';
import assert from 'assert';





mdb.collection('queues').find({}).project({username})