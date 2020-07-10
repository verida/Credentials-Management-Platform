import { Schema } from 'mongoose';

export const IssuerResponseSchema =  new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

    publicKey: {
        type: String,
        required: true
    },

    did: {
        type: String,
        required: true
    },

    chain: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    }
});
