import Mongoose from 'mongoose';


//Define queueList model
const queueListSchema = new Mongoose.Schema({
  q_id: String,
  u_id: String,
  enterTime: Date,
  expired: Boolean
});

//This makes it impossible for a user to enter a queue multiple times
queueListSchema.index({ q_id: 1, u_id: 1}, { unique: true });

export default Mongoose.model('queueList', queueListSchema);