import * as mongoose from "mongoose";

export interface Issuer extends mongoose.Document {
    name: string;
}