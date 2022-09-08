import * as mongoose from 'mongoose';

export interface Issuer extends mongoose.Document {
  name: string;
  urlName: string;
  avatarUri?: string;
  chain: string;
  did: string;
  publicKey: string;
  privateKey: string;
  address: string;
}
