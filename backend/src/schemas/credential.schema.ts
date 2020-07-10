import { Schema } from 'mongoose';

export const CredentialSchema =  new Schema({
    name: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    issuerId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    credentialId: {
        type: String,
        required: true
    },

    revoked: {
        type: Boolean,
        required: true
    },

    data: {
        type: Object,
        required: true
    }
    
});
