import { Document } from 'mongoose';
import { Role } from "../../../models/User";

export interface User extends Document {
    email: string;
    passwordHash: string;
    role: Role;
    issuerId: string;
}
