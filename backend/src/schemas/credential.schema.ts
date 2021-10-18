import { Schema } from 'mongoose';

export const CredentialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    did: {
      type: String,
      required: true,
    },

    issuerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    credentialId: {
      type: String,
      required: true,
    },

    revoked: {
      type: Boolean,
      required: true,
    },

    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: { createdAt: 'insertedAt' } },
);
