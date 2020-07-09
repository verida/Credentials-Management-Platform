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
    },

    did: {
        type: String,
        required: false
    },

    chain: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    }
});
