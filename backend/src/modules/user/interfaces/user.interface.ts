import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
    email: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}
