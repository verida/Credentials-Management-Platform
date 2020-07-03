import * as mongoose from 'mongoose';

const SavedUserSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export interface SavedUserDocument extends mongoose.Document {
    email: string;
    role: string;
}

export const UserSchema = mongoose.model<SavedUserDocument>('saveduser', SavedUserSchema);
