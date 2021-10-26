import { Document } from 'mongoose';

export interface Credential extends Document {
  name: string;
  did: string;
  issuerId: string;
  credentialId: string;
  revoked: boolean;
  data: object;
}
