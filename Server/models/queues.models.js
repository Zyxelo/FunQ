import Mongoose from 'mongoose';
import shortid from 'shortid';

//Define queue model
const queueSchema = new Mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  thumbnail: String,
  queueTitle: String,
  queueCompany: String,
  queueCompanyID: String,
  queueEventDate:  Date,
  queEndDate: Date,
  location: String,
  queueShortDescription: String,
  queueCategory: String,
  numberOfQueuers: Number,
  queueID: {
  type: String,
    index: { unique: true }
}
});

export default Mongoose.model('Queue', queueSchema);