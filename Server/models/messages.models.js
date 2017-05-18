import Mongoose from 'mongoose';


//Define queue model
const messageSchema = new Mongoose.Schema({
  queueID: String,
  text: String,
  sender: String,
  time: Date

});

export default Mongoose.model('Messages', messageSchema);