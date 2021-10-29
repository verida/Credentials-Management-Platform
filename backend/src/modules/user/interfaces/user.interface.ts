import { Document } from 'mongoose';
import { Role } from '../../../models/User';

export interface User extends Document {
  email: string;
  passwordHash: string;
  role: Role;
  issuerId: string;
  privateKey: string;
  _id?: string;
  name: string;
  urlName: string;
  publicKey: string;
  did: string;
  chain: string;
  address: string;
}
