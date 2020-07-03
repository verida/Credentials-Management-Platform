import { Role } from '../../../models/User';

export class UserDto {
    _id: string;
    email: string;
    role: Role;
    issuerId: string;
}
