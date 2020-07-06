import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    issuerId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

