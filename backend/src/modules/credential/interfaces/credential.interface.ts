import { Document } from 'mongoose';

export interface Credential extends Document {
    name: string;
    mobile: string;
    issuerId: string;
    credentialId: string;
    revoked: boolean;
    data: object;
}
