import { User } from '../modules/user/interfaces/user.interface';
import { Admin } from '../modules/admin/interfaces/admin.interface';

export enum Role {
  admin,
  user,
}

export class Identity {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface Issuer {
  [key: string]: string;
}

export interface UserIdentity extends User {
  isAdmin: boolean;
  issuer: IssuerData;
}

export interface AdminIdentity extends Admin {
  isAdmin: boolean;
}

export interface SendMessageResponse {
  ok: boolean;
  id: string;
  rev: string;
}

export interface IssuerData {
  _id?: string;
  name: string;
  urlName: string;
  privateKey: string;
  publicKey: string;
  did: string;
  chain: string;
  address: string;
}
