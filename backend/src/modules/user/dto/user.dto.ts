import * as mongoose from 'mongoose';
import { Role } from '../../../models/User';

export class UserDto {
    id: mongoose.Schema.Types.ObjectId;
    email: string;
    role: Role;
}
