import * as mongoose from 'mongoose';

export interface VeridaSchema extends mongoose.Document {
  title: string;
  userId: string;
  schemaUrl: string;
}

export interface SchemaUser extends mongoose.Document {
  _id?: string;
  name: string;
  urlName: string;
  privateKey: string;
  publicKey: string;
  did: string;
  chain: string;
  address: string;
}
