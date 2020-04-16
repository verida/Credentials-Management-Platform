import { IsEmail, IsEnum, Length } from 'class-validator';
import { Unique } from '../../../validators/Unique';

import { Role } from '../../../models/User';

export class CreateUserDto {
    @IsEmail()
    @Length(10, 60)
    @Unique({ message: "This email address is already in use" })
    email: string;

    @Length(10, 60)
    password: string;

    @IsEnum(Role)
    role: Role;
    issuerId: string;
}
