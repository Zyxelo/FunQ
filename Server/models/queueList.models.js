import Mongoose from 'mongoose';


//Define queueList model
const queueListSchema = new Mongoose.Schema({
  q_id: String,
  u_id: String,
  enterTime: Date,
  expired: Boolean
});

export default Mongoose.model('queueList', queueListSchema);