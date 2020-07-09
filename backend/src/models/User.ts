export enum Role {
    admin,
    user,
}

export class Identity {
    email: string;
    password: string;
    isAdmin?: boolean;
}
