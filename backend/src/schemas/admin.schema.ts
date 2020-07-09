import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});
