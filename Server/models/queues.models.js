import Mongoose from 'mongoose';


//Define queue model
const queueSchema = new Mongoose.Schema({
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