import { Document } from 'mongoose';

export interface User extends Document {
    email: string;
    passwordHash: string;
    role: string;
    issuerId: string;
}
