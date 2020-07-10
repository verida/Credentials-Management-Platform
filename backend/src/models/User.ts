import { User } from "../modules/user/interfaces/user.interface";
import { Admin } from "../modules/admin/interfaces/admin.interface";


export enum Role {
    admin,
    user,
}

export class Identity {
    email: string;
    password: string;
    isAdmin?: boolean
}

export interface UserIdentity extends User {
    isAdmin: boolean;
}

export interface AdminIdentity extends Admin {
    isAdmin: boolean;
}
