import * as mongoose from "mongoose";

export interface Issuer extends mongoose.Document {
    name: string;
    privateKey: string;
    publicKey: string;
    did: string;
    chain: string;
    address: string;
}