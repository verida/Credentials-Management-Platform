import * as mongoose from "mongoose";

export interface Admin extends mongoose.Document {
    email: string;
    passwordHash: string;
}
