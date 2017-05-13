import Mongoose from 'mongoose';


//Define queue model
const queueSchema = new Mongoose.Schema({
    thumbnail: String,
    queueTitle: String,
    queueCompany: String, //We should change this to userObject i guess
    queueEventDate:  Date,
    queEndDate: Date,
    location: String,
    queueShortDescription: String,
    queueCategory: String, //Maybe an object of a certain category instead of String
    numberOfQueuers: Number,
    queueID: {
        type: String, //Should be counted up automatically preferably
        index: { unique: true }
    }
});

export default Mongoose.model('Queue', queueSchema);