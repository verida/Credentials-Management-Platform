import { Document } from 'mongoose';

export interface Credential extends Document {
    name: string;
    issuerId: string;
    credentialId: string;
    revoked: boolean;
    data: object;
}
