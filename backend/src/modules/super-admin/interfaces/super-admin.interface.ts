import * as mongoose from "mongoose";

export interface SuperAdmin extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
}
