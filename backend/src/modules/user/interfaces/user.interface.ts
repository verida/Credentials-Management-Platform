import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    role: string;
    issuerId: string;
}
