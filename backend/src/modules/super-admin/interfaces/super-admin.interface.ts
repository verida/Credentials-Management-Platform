import * as mongoose from "mongoose";

export interface SuperAdmin extends mongoose.Document {
    email: string;
    password: string;
}
