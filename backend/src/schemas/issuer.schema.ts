import { Schema } from 'mongoose';

export const IssuerSchema =  new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

    seed: {
        type: String,
        required: false
    }
});
