import * as mongoose from 'mongoose';

export class SuperAdminDto {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
}
