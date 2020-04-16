import { Schema } from 'mongoose';

export default new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    }
});
