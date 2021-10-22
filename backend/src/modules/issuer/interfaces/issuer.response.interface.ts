import * as mongoose from 'mongoose';

export interface IssuerResponse extends mongoose.Document {
  name: string;
  publicKey: string;
  did: string;
  chain: string;
  urlName: string;
  address: string;
  privateKey: string;
}
