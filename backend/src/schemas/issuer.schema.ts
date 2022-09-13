import { Schema } from 'mongoose';

export const IssuerSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

  urlName: {
    type: String,
    unique: true,
    required: true,
  },

  avatarUri: {
    type: String,
    required: false,
  },

  privateKey: {
    type: String,
    required: true,
  },

  publicKey: {
    type: String,
    required: true,
  },

  did: {
    type: String,
    required: true,
  },

  chain: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
});
