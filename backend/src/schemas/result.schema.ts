import { Schema } from 'mongoose';

export default new Schema({
    _id: Schema.Types.ObjectId,
    userId: {
        type: String,
        unique: true,
        required: true
    },
    testId: {
        type: String,
        required: true
    },
    result: {
        type: Boolean,
        required: true
    }
});
