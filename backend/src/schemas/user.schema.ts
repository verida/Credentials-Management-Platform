import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    issuerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
