import { Schema } from 'mongoose';

export const CredentialSchema =  new Schema({
    data: {
        type: Object,
        required: true
    },

    dob: {
        type: String,
        required: true
    }
});
