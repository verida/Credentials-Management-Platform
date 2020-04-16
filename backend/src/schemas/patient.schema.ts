import { Schema } from 'mongoose';

export default new Schema({
    _id: Schema.Types.ObjectId,
    userId: {
        type: String,
        unique: true,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    healthNumber: {
        type: String,
        required: true
    }
});
