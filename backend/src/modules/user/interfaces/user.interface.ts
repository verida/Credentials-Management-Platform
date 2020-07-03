export interface User {
    _id: string;
    email: string;
    passwordHash: string;
    role: string;
    issuerId: string;
}
